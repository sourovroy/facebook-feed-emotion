import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'background.footer',
        textAlign: 'center'
      }}
      mt={3} pt={2} pb={2}
    >
      <Button color='secondary' size="small" to="/" component={Link}>Home</Button>
      <span> | </span>
      <Button color='secondary' size="small" to="/privacy-policy" component={Link}>Privacy Policy</Button>
      <span> | </span>
      <Button color='secondary' size="small" to="/user-data-deletion" component={Link}>User Data Deletion</Button>
    </Box>
  );
}

export default Footer;
