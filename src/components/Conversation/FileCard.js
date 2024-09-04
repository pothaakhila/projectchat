import React from 'react';
import { Stack, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { DotsThree, Copy, FloppyDisk, ArrowBendUpRight, Trash, Download } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';

const FileCard = ({ file, onMenuClick, onDownload, onDelete, onUpload, reply }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(file.name);
    handleMenuClose();
  };

  const handleSave = () => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
    handleMenuClose();
  };

  const handleForward = () => {
    // Add your forward functionality here
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete();
    handleMenuClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onUpload(selectedFile); // Pass the file to the parent component
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={handleMenuClick} sx={{ position: 'fixed', left: 448, top: 255, zIndex: 1200 }}>
        <DotsThree size={24} color={theme.palette.primary.main} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleCopy}>
          <Copy size={24} color={theme.palette.primary.main} /> Copy
        </MenuItem>
        <MenuItem onClick={handleSave}>
          <FloppyDisk size={32} color={theme.palette.primary.main} /> Save
        </MenuItem>
        <MenuItem onClick={handleForward}>
          <ArrowBendUpRight size={32} color={theme.palette.primary.main} /> Forward
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Trash size={32} color={theme.palette.primary.main} /> Delete
        </MenuItem>
      </Menu>

      <Box
        p={1}
        pl={2}
        mb={4}
        sx={{
          border: `4px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          boxShadow: 1,
          position: 'fixed',
          left: 430,
          top: 290,
          width: 360,
          height: 60,
          zIndex: 1100,
          overflow: 'visible', // Ensure overflow does not affect fixed position
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2">{file.name}</Typography>
          <IconButton onClick={onDownload}>
            <Download size={24} color={theme.palette.primary.main} />
          </IconButton>
          <IconButton onClick={handleMenuClick}>
            <DotsThree size={24} color={theme.palette.primary.main} />
          </IconButton>
        </Stack>
        {reply && (
          <Box mt={1} p={1} sx={{ backgroundColor: '#000', borderRadius: 1 }}>
            <Typography variant="body2" color="#fff">
              {reply}
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default FileCard;
