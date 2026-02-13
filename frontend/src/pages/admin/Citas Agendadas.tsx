import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  //TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { es } from "date-fns/locale";
import { format } from "date-fns";

// Tipo de datos
type Cita = {
  id: number;
  fecha: string; // formato ISO (ej. "2025-05-05")
  hora: string; // formato 24h (ej. "10:30")
  mascota: string;
  motivo: string;
};

// Datos de ejemplo
const citasAgendadas: Cita[] = [
  { id: 1, fecha: "2025-05-05", hora: "10:00", mascota: "Luna", motivo: "Vacunación" },
  { id: 2, fecha: "2025-05-05", hora: "12:00", mascota: "Rocky", motivo: "Consulta general" },
  { id: 3, fecha: "2025-05-06", hora: "09:30", mascota: "Bella", motivo: "Chequeo dental" },
  { id: 4, fecha: "2025-05-07", hora: "15:00", mascota: "Max", motivo: "Revisión posquirúrgica" },
];

export const CitasAgendadas = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);

  const citasFiltradas = citasAgendadas.filter((cita) =>
    fechaSeleccionada
      ? cita.fecha === format(fechaSeleccionada, "yyyy-MM-dd")
      : false
  );

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Selecciona una fecha para ver las citas
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DatePicker
          label="Fecha"
          value={fechaSeleccionada}
          onChange={(newDate) => setFechaSeleccionada(newDate)}
        />
      </LocalizationProvider>

      {fechaSeleccionada && citasFiltradas.length > 0 ? (
        <TableContainer sx={{ marginTop: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#2196F3" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Hora</TableCell>
                <TableCell sx={{ color: "white" }}>Fecha</TableCell>
                <TableCell sx={{ color: "white" }}>Mascota</TableCell>
                <TableCell sx={{ color: "white" }}>Motivo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citasFiltradas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.mascota}</TableCell>
                  <TableCell>{cita.motivo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : fechaSeleccionada ? (
        <Typography sx={{ marginTop: 2 }} color="text.secondary">No hay citas para esta fecha.</Typography>
      ) : null}
    </Paper>
  );
};

export default CitasAgendadas;