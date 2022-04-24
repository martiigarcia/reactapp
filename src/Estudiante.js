import React, { Component } from "react";
import "./Estudiante.css";
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

export default class Estudiantes extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.listarEstudiantes = this.listarEstudiantes.bind(this);

    this.state = {
      listaEstudiantes: [],
      cursos: [{ nombre: "React", horas: "20" }],
      listaCursos: [
        { nombre: "React", horas: "10" },
        { nombre: "Angular", horas: "15" },
        { nombre: "Seminario", horas: "30" },
        { nombre: "Ingenieria", horas: "25" },
        { nombre: "Bases de datos", horas: "20" },
        { nombre: "IPV6", horas: "10" },
        { nombre: "Programacion concurrente", horas: "30" },
        { nombre: "Programacion orientada a objetos", horas: "35" },
      ],
    };
  }

  handleClick() {
    this.setState((state) => ({
      cursos: [
        ...state.cursos,
        state.listaCursos[Math.floor(Math.random() * 8)],
      ],
    }));
  }

  listarEstudiantes() {
    fetch("/archivoEstudiantes.json")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          listaEstudiantes: json.estudiantes,
          resultado: json.result,
        });
      });
    console.log(this.state.listaEstudiantes);
  }

  render() {
    return (
      <div>
        <Divider className="estiloEstudiante">
          <Container
            maxWidth="m"
            component={Paper}
            sx={{ mb: "20px", pt: "10px" }}
          >
            <TableContainer>
              <Button
                variant="outlined"
                sx={{ borderColor: "secondary.main", color: "secondary.dark" }}
                onClick={this.handleClick}
              >
                Incribirse!
              </Button>
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
                    <TableCell align="left">Horas</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.cursos.map((curso, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{curso.nombre}</TableCell>
                      <TableCell align="left">
                        {curso.horas} horas semanales
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>

          <Container
            maxWidth="m"
            component={Paper}
            sx={{ mb: "20px", pt: "10px" }}
          >
            <TableContainer>
              <Button
                variant="outlined"
                sx={{ borderColor: "secondary.main", color: "secondary.dark" }}
                onClick={this.listarEstudiantes}
              >
                listar estudiantes
              </Button>

              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Lista de estudiantes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Indice</TableCell>
                    <TableCell align="left">Nombre</TableCell>
                    <TableCell align="left">Apellido</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.listaEstudiantes.map((e, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{e.nombre}</TableCell>
                      <TableCell align="left">{e.apellido}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Divider>
      </div>
    );
  }
}
