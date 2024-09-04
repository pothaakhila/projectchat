import { styled, alpha } from "@mui/material/styles";

import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

export default Search;



export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
}));

