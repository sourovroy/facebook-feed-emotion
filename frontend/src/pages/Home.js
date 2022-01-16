import Box from '@mui/material/Box';
import Output from '../components/Output';
import Importer from '../components/Importer';
import { useSelector } from 'react-redux';

function Home() {
  const resultPage = useSelector((state) => state.process.resultPage);

  return (
    <Box mb={5}>
      {resultPage ? <Output /> : <Importer />}
    </Box>
  );
}

export default Home;
