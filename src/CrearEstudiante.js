import React, { Component, useEffect, useState } from "react";
import "./CrearEstudiante.css";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import { Input, MenuItem, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";

export default function CrearEstudiante(props) {
  const [form, setForm] = useState({
    form: { nombre: "", apellido: "" },
  });

  const [alignment, setAlignment] = React.useState("");

  const [resultado, setResultado] = React.useState({ resultado: "" });
  const [errors, setErrors] = React.useState({ errors: {} });
  const [mensaje, setMensaje] = React.useState({ mensaje: "" });

  useEffect(() => {}, []);
  //que uso tendria en este momento el useEffect ¿?

  function handleChangeForm(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    setForm((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }

  const handleChangeBoton = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: form.form.nombre,
        apellido: form.form.apellido,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          setResultado({ resultado: json.result });
          setMensaje({ mensaje: "No se completaron los datos correctamente" });
          setErrors({ errors: json.errors });
          return;
        } else {
          setResultado({ resultado: json.result });
          setMensaje({ mensaje: "El estudiante fue registrado exitosamente" });
          setErrors({ errors: [] });
        }
      });
  }

  return (
    <div>
      <Divider className="estiloCrearEstudiante">
        <Container
          maxWidth="m"
          component={Paper}
          sx={{ mb: "20px", pt: "10px", width: "600px" }}
        >
          <List
            sx={{
              width: "500px",
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <p>
                Complete los siguientes campos para registrar un estudiante:
              </p>
            </ListItem>

            <Divider variant="inset" component="li" />
            <ListItem>
              <FormLabel
                sx={{
                  p: "20px",
                }}
                error={errors.errors.nombre}
              >
                Nombre:{" "}
                <Input
                  color="secondary"
                  fullWidth
                  sx={{ m: 1, width: "350px" }}
                  variant="standard"
                  placeholder="Nombre"
                  type="text"
                  name="nombre"
                  onChange={handleChangeForm}
                  helperText={errors.errors.nombre}
                  error={errors.errors.nombre}
                />
                <FormHelperText error>{errors.errors.nombre}</FormHelperText>
              </FormLabel>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem></ListItem>
            <ListItem>
              <FormLabel
                sx={{
                  p: "20px",
                }}
                error={errors.errors.apellido}
              >
                Apellido:{" "}
                <Input
                  id="component-error"
                  color="secondary"
                  fullWidth
                  sx={{ m: 1, width: "350px" }}
                  variant="standard"
                  placeholder="Apellido"
                  type="text"
                  name="apellido"
                  onChange={handleChangeForm}
                  helperText={errors.errors.apellido}
                  error={errors.errors.apellido}
                />
                <FormHelperText error>{errors.errors.apellido}</FormHelperText>
              </FormLabel>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ToggleButtonGroup
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChangeBoton}
                onClick={handleSubmit}
                variant="outlined"
                type="submit"
                sx={{
                  mt: "20px",
                  ml: "200px",
                  width: "100px",
                  pt: "5px",
                }}
              >
                <ToggleButton value="confirmar">Confirmar</ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
            <ListItem></ListItem>
          </List>
          <Stack sx={{ width: "100%", mb: "10px" }} spacing={2}>
            {resultado.resultado && (
              <Alert severity={resultado.resultado}>
                <AlertTitle>
                  {resultado.resultado === "error" ? "Error!" : "Éxito!"}
                </AlertTitle>
                {mensaje.mensaje}
              </Alert>
            )}
          </Stack>
        </Container>
      </Divider>
    </div>
  );
}
