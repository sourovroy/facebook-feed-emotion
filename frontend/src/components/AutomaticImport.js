import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setLoading, setResultPage, startProcessingThunk } from '../store/processReducer';

export default function AutomaticImport() {
  const dispatch = useDispatch();
  const [loadingButton, setButtonLoading] = useState(false);

  const sendToProcess = (data) => {
    let items = [];
    data.forEach((item) => {
      if (item.message) {
        items.push(item.message);
      }
    });

    dispatch(setLoading(true));
    dispatch(setResultPage(true));
    dispatch(startProcessingThunk(items));
  };

  const getPosts = (userID) => {
    FB.api( // eslint-disable-line no-undef
      `/${userID}/posts`,
      {include_hidden: true, limit: 10},
      function(response) {
        setButtonLoading(false);
        console.log("Total", response.data.length, "posts found.");
        if (response && 0 < response.data.length) {
          sendToProcess(response.data);
        } else {
          console.log("No posts found.", response);
        }
      }
    );
  };

  const onClickAuthorize = () => {
    setButtonLoading(true);
    FB.login(function(response) { // eslint-disable-line no-undef
      if (response.authResponse) {
        console.log('User logged in. Fetching user posts.');
        getPosts(response.authResponse.userID);
      } else {
        setButtonLoading(false);
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'user_posts'});
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      mb={16}
    >
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h4" align="center" mb={2}>
            Automatic Import
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            You have to give read permission to your application, so that we can get your profile feed and analyze them.
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            mt={3}
          >
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={onClickAuthorize}
              startIcon={<FacebookIcon />}
              loading={loadingButton}
              loadingPosition="start"
            >Authorize</LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
