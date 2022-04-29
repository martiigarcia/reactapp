import React, { useEffect, useState } from "react";
import "./CrearEstudiante.css";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import { MenuItem, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function CrearEstudiante(props) {
  const [alignment, setAlignment] = React.useState("");

  const [cursos, setCursos] = useState({ cursos: [] });
  const [estudiantes, setEstudiantes] = useState({ estudiantes: [] });

  const [form, setForm] = useState({
    form: { nombreCurso: "", apellidoEstudiante: "" },
  });

  const [resultado, setResultado] = React.useState({ resultado: "" });
  const [errors, setErrors] = React.useState({ errors: {} });
  const [mensaje, setMensaje] = React.useState({ mensaje: "" });

  const handleChangeBoton = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    listarEstudiantes();
    listarCursos();
  }, []);

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

  /*function handleSubmit(e) {
    e.preventDefault();

    console.log("apellido estudiante: " + form.form.apellidoEstudiante);
    console.log("nombre curso: " + form.form.nombreCurso);

    fetch(
      "http://localhost:1234/inscripcion?apellido=" +
        form.form.apellidoEstudiante +
        "&curso=" +
        form.form.nombreCurso,
      {
        method: "POST",
        //body: JSON.stringify({
       //   cursos: [cursoseleccionado.cursoSeleccionado],
       // }),
      }
    ).then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          setResultado({ resultado: json.result });
          setMensaje({ mensaje: "No se completaron los datos correctamente" });
          setErrors({ errors: json.errors });
          return;
        } else {
          setResultado({ resultado: json.result });
          setMensaje({ mensaje: "El estudiante fue inscripto exitosamente" });
          setErrors({ errors: [] });
        }
      });
  }*/

  function handleSubmit(e) {
    e.preventDefault();

    console.log("apellido estudiante: " + form.form.apellidoEstudiante);
    console.log("nombre curso: " + form.form.nombreCurso);

    fetch("http://localhost:1234/inscripcion", {
      method: "POST",
      body: JSON.stringify({
        nombre: "",
        apellido: form.form.apellidoEstudiante,
        cursos: [form.form.nombreCurso],
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
          setMensaje({ mensaje: "El estudiante fue inscripto exitosamente" });
          setErrors({ errors: [] });
        }
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
                error={errors.errors.nombreCurso}
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
                name="nombreCurso"
                onChange={handleChangeForm}
                helperText="Seleccione un curso de la lista"
                error={errors.errors.nombreCurso}
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
                error={errors.errors.apellido}
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
                name="apellidoEstudiante"
                onChange={handleChangeForm}
                helperText="Seleccione un estudiante de la lista"
                error={errors.errors.apellido}
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
                <ToggleButton value="inscribir">Inscribir</ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
            <ListItem>
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
            </ListItem>
          </List>
        </Container>
      </Divider>
    </div>
  );
}
