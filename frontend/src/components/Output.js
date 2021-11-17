import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';

function OutputList() {
  const response = useSelector((state) => state.process.response);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Your Average Result
        </Typography>
        <List>
          {Object.keys(response).map((key) => <ListItem>
            {key}: {response[key]}%
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
  );
}

function LoadingCard() {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress />
          <p>Loading...</p>
        </Box>
      </CardContent>
    </Card>
  );
}

function Output() {
  const loading = useSelector((state) => state.process.loading);
  const response = useSelector((state) => state.process.response);

  return (
    <Box mt={3}>
      {loading && <LoadingCard />}

      {Object.keys(response).length > 0 && <OutputList />}
    </Box>
  );
}

export default Output;
