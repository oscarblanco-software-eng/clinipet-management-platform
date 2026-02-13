// src/pages/user/RegistrarMascotas.tsx
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type PetForm = {
  id?: number; // asumimos que existe id
  name: string;
  species: string;
  breed: string;
  sex: string;
  age: number;
  owner: string;
  phone: string;
};

export default function RegistrarMascotas() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetForm>();

  const [pets, setPets] = useState<PetForm[]>([]);

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/pets");
      const data = res.data;

      if (Array.isArray(data)) {
        setPets(data);
      } else {
        console.error("La respuesta del backend no es un arreglo:", data);
        setPets([]);
      }
    } catch (err) {
      console.error("Error al cargar mascotas:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const onSubmit = async (data: PetForm) => {
    try {
      const res = await axios.post("http://localhost:3001/api/pets", data);
      const nuevaMascota = res.data;

      if (nuevaMascota && typeof nuevaMascota === "object") {
        setPets([...pets, nuevaMascota]);
      }

      reset();
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error al registrar mascota:", error);
      console.error("Detalles:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3001/api/pets/${id}`);
      setPets(pets.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error("Error al eliminar mascota:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Registro de Mascotas
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {[
              { name: "name", label: "Nombre" },
              { name: "species", label: "Especie" },
              { name: "breed", label: "Raza" },
              { name: "owner", label: "Dueño" },
            ].map(({ name, label }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  {...register(name as keyof PetForm, {
                    required: `El campo ${label} es obligatorio`,
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                      message: `${label} debe contener solo letras`,
                    },
                  })}
                  error={!!errors[name as keyof PetForm]}
                  helperText={errors[name as keyof PetForm]?.message}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Sexo"
                defaultValue=""
                {...register("sex", {
                  required: "El sexo es obligatorio",
                })}
                error={!!errors.sex}
                helperText={errors.sex?.message}
              >
                <MenuItem value="Macho">Macho</MenuItem>
                <MenuItem value="Hembra">Hembra</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Edad en meses"
                type="number"
                {...register("age", {
                  required: "La edad es obligatoria",
                  min: { value: 0, message: "Edad no válida" },
                })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                type="tel"
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message: "Debe ser un número válido",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <Button type="submit" variant="contained" fullWidth>
                Registrar Mascota
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Mascotas Registradas
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Especie</TableCell>
              <TableCell>Raza</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Dueño</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(pets) && pets.length > 0 ? (
              pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell>{pet.species}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>{pet.sex}</TableCell>
                  <TableCell>{pet.age}</TableCell>
                  <TableCell>{pet.owner}</TableCell>
                  <TableCell>{pet.phone}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(pet.id)}
                      aria-label="Eliminar mascota"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>No hay mascotas registradas.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
