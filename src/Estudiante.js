import React, { Component, useEffect, useState } from "react";
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

export default function Estudiante(props) {
  const [estudiantes, setEstudiantes] = useState({ estudiantes: [] });

  useEffect(() => {
    listarEstudiantes(props.inputValue);
  }, [props.inputValue]);

  function listarEstudiantes(inputValue) {
    fetch("http://localhost:1234/estudiantes?apellido=" + inputValue)
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
          sx={{ mb: "20px", pt: "10px" }}
        >
          <TableContainer>
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
                {estudiantes.estudiantes.map((e, index) => (
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
