import { Card, CardContent, Typography } from '@mui/material';

function UserDataDeletion() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1" mb={2}>User Data Deletion</Typography>
        <Typography variant="body1" component="div" color="text.secondary">
          <p>We do not store any of your data, so there is nothing to delete.</p>
          <p>You may check it in our public repository https://github.com/sourovroy/facebook-feed-emotion</p>
          <p>If you have any question feel free to contact us at sadiyarime12@gmail.com</p>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDataDeletion;
