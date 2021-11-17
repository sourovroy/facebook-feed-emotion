import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Output from './components/Output';
import Header from './components/Header';
import Importer from './components/Importer';

function App() {
  return (
    <div className="App">
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={8}>
          <Box mt={2} mb={3}>
            <Header />

            <Importer />

            <Output />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
