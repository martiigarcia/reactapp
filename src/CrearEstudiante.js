import React, { Component, useEffect, useState } from "react";
import "./CrearEstudiante.css";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Input, MenuItem, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { display } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PruebaToggleButon from "./PruebaToggleButon";

export default function CrearEstudiante(props) {
  const [cursos, setCursos] = useState({ cursos: [] });
  const [nombre, setNombre] = useState({ nombre: "" });
  const [apellido, setApellido] = useState({ apellido: "" });
  const [curso, setCurso] = useState({ curso: "" });

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
        //ver que funcionan los errores
      });
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
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  mt: "20px",
                  ml: "200px",
                  width: "100px",
                  borderColor: "secondary.main",
                  pt: "5px",
                  color: "black",
                }}
                onClick={handleSubmit}
              >
                Confirmar
              </Button>
            </ListItem>
            <ListItem></ListItem>
          </List>
        </Container>
      </Divider>
    </div>
  );
}
