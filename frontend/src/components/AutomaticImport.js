import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function AutomaticImport() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
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
            <Button variant="contained" color="primary">Authorize</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
