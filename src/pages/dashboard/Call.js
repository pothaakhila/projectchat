import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ClockCounterClockwise, MagnifyingGlass, Phone, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallLogElement } from "../../components/CallElement";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { contacts } from "../../data";
import { FetchCallLogs } from "../../redux/slices/app";
import StartCall from "../../sections/Dashboard/StartCall";
import ContactList from "./ContactList";

// Import your custom components
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";

const Call = () => {
  const dispatch = useDispatch();
  const { call_logs } = useSelector((state) => state.app);
  const [openDialog, setOpenDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [openAddContactBox, setOpenAddContactBox] = useState(false);
  const [email, setEmail] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");

  useEffect(() => {
    dispatch(FetchCallLogs());
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  const toggleAddContactBox = () => {
    setOpenAddContactBox(prev => !prev);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInvitationMessageChange = (event) => {
    setInvitationMessage(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Invitation Message:", invitationMessage);
    setOpenAddContactBox(false);
  };

  const theme = useTheme();

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box
          sx={{
            overflowY: "scroll",
            height: "100vh",
            width: 340,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Contacts</Typography>
              <IconButton onClick={toggleAddContactBox}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>

            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <IconButton onClick={toggleHistory}>
                <ClockCounterClockwise size={32} style={{ color: theme.palette.primary.main }} />
              </IconButton>
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Start a conversation
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                {showHistory ? (
                  <Stack spacing={2.4}>
                    {call_logs.length > 0 ? (
                      <Stack spacing={2.4}>
                        <Typography variant="h6">Call History</Typography>
                        {call_logs.map((el, idx) => (
                          <CallLogElement key={idx} {...el} />
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body1">No Contacts available</Typography>
                    )}
                  </Stack>
                ) : (
                  <ContactList contacts={contacts} />
                )}
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {openDialog && (
        <StartCall open={openDialog} handleClose={handleCloseDialog} />
      )}
      <Modal
        open={openAddContactBox}
        onClose={toggleAddContactBox}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            width: 400,
            p: 3,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <IconButton
            onClick={toggleAddContactBox}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <X size={24} />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Add Contact
          </Typography>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={handleEmailChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Invitation Message"
            value={invitationMessage}
            onChange={handleInvitationMessageChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={toggleAddContactBox}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Call;





