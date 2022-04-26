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

export default function CrearEstudiante(props) {
  const [cursos, setCursos] = useState({ cursos: [] });
  const [nombre, setNombre] = useState({ nombre: "" });
  const [apellido, setApellido] = useState({ apellido: "" });
  const [curso, setCurso] = useState({ curso: "" });

  const [alignment, setAlignment] = React.useState("");
  const [resultado, setResultado] = React.useState({ resultado: "" });
  const [errors, setErrors] = React.useState({ errores: [] });
  const [mensaje, setMensaje] = React.useState({ mensaje: "" });

  useEffect(() => {
    listarCursos();
  }, []);

  function handleChangeCursos(e) {
    let valor = e.target.value;
    setCurso(() => ({
      curso: valor,
    }));
  }
  function handleChangeNombre(e) {
    let valor = e.target.value;
    setNombre(() => ({
      nombre: valor,
    }));
  }
  function handleChangeApellido(e) {
    let valor = e.target.value;
    setApellido(() => ({
      apellido: valor,
    }));
  }
  const handleChangeBoton = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function handleSubmit(e) {
    e.preventDefault();

    console.log(nombre.nombre);
    console.log(apellido.apellido);
    console.log(curso.curso);

    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: nombre.nombre,
        apellido: apellido.apellido,
        cursos: curso.curso,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          console.log(json.result);
          setResultado(json.result);
          setErrors(json.errors);
          return;
        } else {
          setResultado(json.result);
          setMensaje("El estudiante fue creado exitosamente");
        }
      });
    console.log(resultado.resultado);
  }

  function listarCursos() {
    fetch("http://localhost:1234/cursos")
      .then((resp) => resp.json())
      .then((json) => {
        setCursos(() => ({
          cursos: json.cursos,
          resultado: json.result,
        }));
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
            <ListItem>
              <FormLabel
                sx={{
                  p: "20px",
                }}
              >
                Cursos:{" "}
              </FormLabel>
              <TextField
                sx={{
                  width: "500px",
                  pb: "20px",
                }}
                id="outlined-select-currency"
                select
                label="Cursos"
                onChange={handleChangeCursos}
                helperText="Seleccione un curso de la lista"
              >
                {cursos.cursos.map((c) => (
                  <MenuItem value={c.nombre}>{c.nombre}</MenuItem>
                ))}
              </TextField>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <FormLabel
                sx={{
                  p: "20px",
                }}
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
                  onChange={handleChangeNombre}
                />
              </FormLabel>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <FormLabel
                sx={{
                  p: "20px",
                }}
              >
                Apellido:{" "}
                <Input
                  color="secondary"
                  fullWidth
                  sx={{ m: 1, width: "350px" }}
                  variant="standard"
                  placeholder="Apellido"
                  type="text"
                  name="apellido"
                  onChange={handleChangeApellido}
                />
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
            <Alert severity={resultado.resultado}>
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          </Stack>
        </Container>
      </Divider>
    </div>
  );
}
