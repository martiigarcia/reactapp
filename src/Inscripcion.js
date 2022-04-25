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
import { display, width } from "@mui/system";
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
  const [cursoseleccionado, setCurso] = useState({ cursoSeleccionado: "" });
  const [estudiantes, setEstudiantes] = useState({ estudiantes: [] });
  const [estudianteSeleccionado, setEstudiante] = useState({
    estudianteSeleccionado: "",
  });

  useEffect(() => {
    listarEstudiantes();
    listarCursos();
  }, []);

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
  function handleChangeCurso(e) {
    let valor = e.target.value;
    setCurso(() => ({
      cursoSeleccionado: valor,
    }));
  }
  function handleChangeEstudiante(e) {
    let valor = e.target.value;
    setEstudiante(() => ({
      estudianteSeleccionado: valor,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(estudianteSeleccionado.estudianteSeleccionado);
    console.log(cursoseleccionado.cursoSeleccionado);

    fetch(
      "http://localhost:1234/estudiantes?apellido=" +
        estudianteSeleccionado.estudianteSeleccionado,
      {
        method: "POST",
        body: JSON.stringify({
          cursos: [cursoseleccionado.cursoSeleccionado],
        }),
      }
    )
      .then((resp) => resp.json())
      .then((json) => {
        //ver como funcionan los errores aca
      });
  }

  function listarEstudiantes() {
    fetch("http://localhost:1234/estudiantes")
      .then((resp) => resp.json())
      .then((json) => {
        setEstudiantes(() => ({
          estudiantes: json.estudiantes,
          resultado: json.result,
        }));
      });
  }

  return (
    <div>
      <Divider className="estiloEstudiante">
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
                Complete con el curso y el estudiante<br></br> correspondientes
                a la inscripcion:
              </p>
            </ListItem>
            <ListItem>
              <FormLabel
                sx={{
                  p: "20px",
                  pb: "5px",
                }}
              >
                Seleccione el curso:
              </FormLabel>
            </ListItem>
            <ListItem>
              <TextField
                sx={{
                  width: "500px",
                  pb: "20px",
                }}
                id="outlined-select-currency"
                select
                label="Cursos"
                onChange={handleChangeCurso}
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
                  pb: "5px",
                }}
              >
                Seleccion el estudiante a inscribir:
              </FormLabel>
            </ListItem>
            <ListItem>
              <TextField
                sx={{
                  width: "500px",
                  pb: "20px",
                }}
                id="outlined-select-currency"
                select
                label="Estudiantes"
                onChange={handleChangeEstudiante}
                helperText="Seleccione un estudiante de la lista"
              >
                {estudiantes.estudiantes.map((c, index) => (
                  <MenuItem value={c.apellido}>
                    {c.nombre} {c.apellido}
                  </MenuItem>
                ))}
              </TextField>
            </ListItem>
            <Divider variant="inset" component="li" />

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
                Inscribir
              </Button>
            </ListItem>
            <ListItem></ListItem>
          </List>
        </Container>
      </Divider>
    </div>
  );
}
