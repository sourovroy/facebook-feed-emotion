import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Output from './components/Output';
import Header from './components/Header';
import Importer from './components/Importer';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Add script tag for Facebook
 */
function loadFacebookSDK() {
  const script = document.createElement('script');

  script.src = "https://connect.facebook.net/en_US/sdk.js";
  script.async = true;
  script.defer = true;
  script.crossorigin = "anonymous";

  document.body.appendChild(script);

  window.fbAsyncInit = function() {
    FB.init({ // eslint-disable-line no-undef
      appId: process.env.REACT_APP_FB_APP_ID,
      autoLogAppEvents : true,
      xfbml: true,
      version: 'v12.0'
    });
  };
}

function App() {
  const resultPage = useSelector((state) => state.process.resultPage);

  // Add Facebook SDK.
  useEffect(() => {
    loadFacebookSDK();
  }, []);

  return (
    <div className="App">
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={8}>
          <Box mt={2} mb={3}>
            <Header />

            {resultPage ? <Output /> : <Importer />}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
