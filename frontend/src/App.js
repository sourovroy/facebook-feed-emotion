import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Output from './components/Output';
import Header from './components/Header';
import Importer from './components/Importer';

import { useSelector } from 'react-redux';

function App() {
  const resultPage = useSelector((state) => state.process.resultPage);

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
