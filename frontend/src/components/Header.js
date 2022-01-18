import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Typography variant="h1" align="center" mb={5}
      sx={ { fontSize: { xs: "1.75rem", sm: "3.75rem" } } }
    >
      Emotion Analysis of Facebook User
    </Typography>
  );
}
