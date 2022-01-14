import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Grid, Box } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { setResponse, setResultPage } from '../store/processReducer';
import { useDispatch } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { nanoid } from 'nanoid';

ChartJS.register(ArcElement, Tooltip, Legend);

function OutputList() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.process.response);
  const averageResult = response.average_result;
  const itemsResult = response.items_result;

  const onGoBack = () => {
    dispatch(setResultPage(false));
    dispatch(setResponse({}));
  };

  const averageResultKeys = Object.keys(averageResult);
  const averageResultValues = Object.values(averageResult);

  const pieData = {
    labels: averageResultKeys.map(i => i + " - " + averageResult[i] + "%"),
    datasets: [{
      label: 'Dataset 1',
      data: averageResultValues,
      backgroundColor: [
        'rgb(253, 1, 0)',
        'rgb(47, 162, 54)',
        'rgb(238, 222, 4)',
        'rgb(160, 214, 54)',
        'rgb(207, 105, 21)',
        'rgb(51, 62, 212)',
      ],
      borderWidth: 0,
    }]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        onClick: (e) => {
          e.native.stopPropagation();
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = averageResultKeys[context.dataIndex] + ": ";
            return label + averageResultValues[context.dataIndex] + "%";
          }
        }
      }
    }
  };

  return (
    <Card>
      <CardContent>

        <Grid container>
          <Grid item xs={6}>
            {itemsResult.map((item, index) => <div key={nanoid()}>
              <Typography variant="h6"><strong>Facebook post - {index + 1}:</strong></Typography>
              <Typography variant="body1" mb={2}>{item.sentence}</Typography>
            </div>)}

            <Typography variant="h6" gutterBottom>Result:</Typography>
            <Alert icon={false} severity="info">{response.summary}</Alert>
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Typography variant="h6" mb={2} align="center">Statistical Report</Typography>
            <Doughnut options={pieOptions} data={pieData} />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={onGoBack}>Go Back</Button>
        </Box>
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
