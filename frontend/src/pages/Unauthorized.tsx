import { Box, Typography } from "@mui/material";


const Unauthorized = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" color="error">Acceso denegado</Typography>
      <Typography variant="body1">No tienes permisos para ver esta página.</Typography>
    </Box>
  );
};

export default Unauthorized;
