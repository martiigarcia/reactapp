import React, { useEffect, useState } from "react";
import "./Curso.css";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

export default function Cursos(props) {
  const [cursos, setCursos] = useState({ cursos: [] });

  useEffect(() => {
    listarCursos(props.inputValue);
  }, [props.inputValue]);

  function listarCursos(inputValue) {
    fetch("http://localhost:1234/cursos?nombre=" + inputValue)
      .then((resp) => resp.json())
      .then((json) => {
        setCursos(() => ({
          cursos: json.cursos,
          resultado: json.result,
        }));
      });
  }

  return (
    <Divider className="estiloCursos">
      <Container maxWidth="m" component={Paper} sx={{ mb: "20px", pt: "10px" }}>
        <TableContainer>
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
              {cursos.cursos.map((curso, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{curso.nombre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Divider>
  );
}
