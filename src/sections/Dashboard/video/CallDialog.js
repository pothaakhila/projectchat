import React, { useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Stack,
} from "@mui/material";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { socket } from "../../../socket";
import { ResetVideoCallQueue, initiateCall } from "../../../redux/slices/videoCall";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const audioStreamRef = useRef(null);
  const videoStreamRef = useRef(null);

  const [call_details] = useSelector((state) => state.videoCall.call_queue);
  const { incoming } = useSelector((state) => state.videoCall);
  const { token } = useSelector((state) => state.auth);

  const appID = 1642584767;
  const server = "wss://webliveroom1642584767-api.coolzcloud.com/ws";

  const roomID = call_details?.roomID;
  const userID = call_details?.userID;
  const userName = call_details?.userName;

  const zg = new ZegoExpressEngine(appID, server);

  const audioStreamID = `audio_${call_details?.streamID}`;
  const videoStreamID = `video_${call_details?.streamID}`;

  const handleDisconnect = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    } else {
      socket?.off("video_call_accepted");
      socket?.off("video_call_denied");
      socket?.off("video_call_missed");

      zg.stopPublishingStream(audioStreamID);
      zg.stopPublishingStream(videoStreamID);
      zg.stopPlayingStream(`audio_${userID}`);
      zg.stopPlayingStream(`video_${userID}`);
      zg.destroyStream(audioStreamRef.current);
      zg.destroyStream(videoStreamRef.current);
      zg.logoutRoom(roomID);

      dispatch(ResetVideoCallQueue());
      handleClose();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("video_call_not_picked", { to: call_details?.streamID, from: userID }, () => {
        // Handle missed call
        handleDisconnect();
      });
    }, 30 * 1000);

    socket.on("video_call_missed", () => {
      // Handle missed call
      handleDisconnect();
    });

    socket.on("video_call_accepted", () => {
      // Clear timeout for missed call
      clearTimeout(timer);
    });

    if (!incoming) {
      socket.emit("start_video_call", { to: call_details?.streamID, from: userID, roomID });
    }

    socket.on("video_call_denied", () => {
      // Handle call denial
      handleDisconnect();
    });

    async function fetchToken() {
      try {
        const response = await axiosInstance.post(
          "/user/generate-zego-token",
          { userId: userID, room_id: roomID },
          { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        );
        return response.data.token;
      } catch (error) {
        console.error("Error fetching token:", error);
        return null;
      }
    }

    fetchToken().then((this_token) => {
      if (this_token) {
        zg.checkSystemRequirements()
          .then((result) => {
            if (result.webRTC && result.microphone && result.camera) {
              zg.loginRoom(roomID, this_token, { userID, userName }, { userUpdate: true })
                .then(async () => {
                  const localAudioStream = await zg.createStream({ camera: { audio: true, video: false } });
                  const localVideoStream = await zg.createStream({ camera: { audio: false, video: true } });

                  audioStreamRef.current = localAudioStream;
                  videoStreamRef.current = localVideoStream;

                  const localAudio = document.getElementById("local-audio");
                  const localVideo = document.getElementById("local-video");
                  localAudio.srcObject = localAudioStream;
                  localVideo.srcObject = localVideoStream;

                  localVideo.play();

                  zg.startPublishingStream(audioStreamID, localAudioStream);
                  zg.startPublishingStream(videoStreamID, localVideoStream);

                  zg.on("publisherStateUpdate", (result) => console.log(result));
                  zg.on("publishQualityUpdate", (streamID, stats) => console.log(streamID, stats));
                })
                .catch((error) => console.error("Error during login:", error));

              zg.on("roomStateUpdate", (roomID, state) => console.log(state));
              zg.on("roomUserUpdate", async (roomID, updateType, userList) => {
                if (updateType === "ADD") {
                  const remoteAudioStream = await zg.startPlayingStream(`audio_${userID}`);
                  const remoteVideoStream = await zg.startPlayingStream(`video_${userID}`);

                  const remoteAudio = document.getElementById("remote-audio");
                  const remoteVideo = document.getElementById("remote-video");

                  remoteAudio.srcObject = remoteAudioStream;
                  remoteVideo.srcObject = remoteVideoStream;

                  remoteAudio.play();
                  remoteVideo.play();
                } else {
                  handleDisconnect();
                }
              });

              zg.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
                console.log(updateType, streamList);
              });

              zg.on("playerStateUpdate", (result) => console.log(result));
              zg.on("playQualityUpdate", (streamID, stats) => console.log(streamID, stats));
            }
          })
          .catch((err) => console.error(err));
      }
    });

    return () => {
      handleDisconnect();
    };
  }, [open, call_details, incoming, token, userID, roomID, userName]);

  const handleCallClick = async () => {
    try {
      // Example of storing the call details in the database
      const response = await axiosInstance.post(
        "/api/call/start",
        { ...call_details, status: "initiated" },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      dispatch(initiateCall(response.data)); // Assuming response.data contains the call details
      handleClose(); // Close the dialog after storing the call
    } catch (error) {
      console.error("Error initiating call:", error);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDisconnect}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Stack direction="row" spacing={24} p={2}>
          <Stack>
            <video style={{ height: 200, width: 200 }} id="local-video" controls={false} />
            <audio id="local-audio" controls={false} />
          </Stack>
          <Stack>
            <video style={{ height: 200, width: 200 }} id="remote-video" controls={false} />
            <audio id="remote-audio" controls={false} />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCallClick} variant="contained" color="primary">
          Start Call
        </Button>
        <Button onClick={handleDisconnect} variant="contained" color="error">
          End Call
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CallDialog;
