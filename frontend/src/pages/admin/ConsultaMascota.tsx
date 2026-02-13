import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/axios.ts";

const ConsultaMascota = () => {
  const [searchId, setSearchId] = useState("");
  const [pet, setPet] = useState<any | null>(null);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [newConsult, setNewConsult] = useState({
    date: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
  });

  const fetchPet = async () => {
    try {
      const res = await api.get(`/pets/${searchId}`);
      setPet(res.data);
      fetchConsultations(res.data.id);
    } catch (error) {
      setPet(null);
      setConsultations([]);
      alert("Mascota no encontrada");
    }
  };

  const fetchConsultations = async (petId: number) => {
    const res = await api.get(`/consultations/pet/${petId}`);
    setConsultations(res.data);
  };

  const handleSaveConsultation = async () => {
    try {
      const res = await api.post("/consultations", {
        petId: pet.id,
        ...newConsult,
      });
      setConsultations([...consultations, res.data]);
      setNewConsult({ date: "", symptoms: "", diagnosis: "", treatment: "" });
    } catch (error) {
      alert("Error al guardar la consulta");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom></Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Buscar por ID de mascota"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button variant="contained" onClick={fetchPet}>
          Buscar
        </Button>
      </Stack>

      {pet && (
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">Información de la Mascota</Typography>
          <Typography>Nombre: {pet.name}</Typography>
          <Typography>Especie: {pet.species}</Typography>
          <Typography>Raza: {pet.breed}</Typography>
          <Typography>Edad: {pet.age}</Typography>
          <Typography>Propietario: {pet.owner}</Typography>
        </Paper>
      )}

      {pet && (
        <Box>
          <Typography variant="h6">Registrar Nueva Consulta</Typography>
          <Stack spacing={2} mt={1} mb={2}>
            <TextField
              label="Fecha"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newConsult.date}
              onChange={(e) =>
                setNewConsult({ ...newConsult, date: e.target.value })
              }
            />
            <TextField
              label="Síntomas"
              multiline
              value={newConsult.symptoms}
              onChange={(e) =>
                setNewConsult({ ...newConsult, symptoms: e.target.value })
              }
            />
            <TextField
              label="Diagnóstico"
              multiline
              value={newConsult.diagnosis}
              onChange={(e) =>
                setNewConsult({ ...newConsult, diagnosis: e.target.value })
              }
            />
            <TextField
              label="Tratamiento"
              multiline
              value={newConsult.treatment}
              onChange={(e) =>
                setNewConsult({ ...newConsult, treatment: e.target.value })
              }
            />
            <Button variant="contained" onClick={handleSaveConsultation}>
              Guardar Consulta
            </Button>
          </Stack>

          <Typography variant="h6" mt={4}>
            Historial de Consultas
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Síntomas</TableCell>
                <TableCell>Diagnóstico</TableCell>
                <TableCell>Tratamiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultations.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.date}</TableCell>
                  <TableCell>{c.symptoms}</TableCell>
                  <TableCell>{c.diagnosis}</TableCell>
                  <TableCell>{c.treatment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ConsultaMascota;
