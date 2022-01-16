import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useRoutes } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import routes from './routes';

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
  // Add Facebook SDK.
  useEffect(() => {
    loadFacebookSDK();
  }, []);

  let elements = useRoutes(routes);

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={8}>
          <Box mt={2}>
            <Header />
            {elements}
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default App;
