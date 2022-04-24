import React, { Component } from "react";
import "./Curso.css";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

export default class Cursos extends Component {
  constructor(props) {
    super(props);
    this.listarCursos = this.listarCursos.bind(this);
    this.listarCursosEstudiante = this.listarCursosEstudiante.bind(this);

    this.state = {
      listaCursos: [],
      estudiante: [],
    };
  }

  listarCursos() {
    fetch("/archivoCursos.json")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          listaCursos: json.cursos,
          resultado: json.result,
        });
      });
  }

  listarCursosEstudiante() {
    fetch("/archivoEstudiantes.json?apellido=Garcia")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          estudiante:
            json.estudiantes[0].nombre + " " + json.estudiantes[0].apellido,
          listaCursos: json.estudiantes[0].cursos,
          resultado: json.result,
        });
      });
  }

  render() {
    return (
      <Divider className="estiloCursos">
        <Container
          maxWidth="m"
          component={Paper}
          sx={{ mb: "20px", pt: "10px" }}
        >
          <TableContainer>
            <Button
              variant="outlined"
              sx={{
                borderColor: "secondary.main",
                color: "secondary.dark",
                mr: "10px",
              }}
              onClick={this.listarCursos}
            >
              listar cursos
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "secondary.main",
                color: "secondary.dark",
                ml: "10px",
              }}
              onClick={this.listarCursosEstudiante}
            >
              listar primer estudiante
            </Button>
            <p>
              {this.state.estudiante
                ? "Estudiante: " + this.state.estudiante
                : ""}
            </p>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Lista de cursos
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Indice</TableCell>
                  <TableCell align="left">Nombre</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.listaCursos.map((curso, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{curso.curso}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Divider>
    );
  }
}
