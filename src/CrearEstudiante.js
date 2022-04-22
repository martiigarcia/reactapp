import React, { Component } from "react";
import "./CrearEstudiante.css";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem } from "@mui/material";

export default class CrearEstudiante extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      form: {
        nombre: "",
        apellido: "",
        cursos: "",
      },
      resultado: "",
      listaCursos: [],
    };
  }

  handleChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }
  handleSubmit(e) {
    e.preventDefault();

    fetch("/archivoEstudiantes.json", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        cursos: [this.state.form.cursos],
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.result,
          });
          return;
        }
        this.setState({
          resultado: "El estudiante fue creado exitosamente.",
        });
      });
  }

  componentDidMount() {
    fetch("/archivoCursos.json")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          listaCursos: json.cursos,
          resultado: json.result,
        });
      });
  }

  render() {
    return (
      <Divider className="estiloEstudiante">
        <Container maxWidth="m">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Cursos</InputLabel>
            <Select
              name="cursos"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Cursos"
              onChange={this.handleChange}
            >
              {this.state.listaCursos.map((c) => (
                <MenuItem value={c.id}>{c.curso}</MenuItem>
              ))}
            </Select>

            <FormLabel>
              Nombre:{" "}
              <input
                placeholder="Nombre"
                type="text"
                name="nombre"
                value={this.state.form.nombre}
                onChange={this.handleChange}
              />
            </FormLabel>
            <FormLabel>
              Apellido:{" "}
              <input
                placeholder="Apellido"
                type="text"
                name="apellido"
                value={this.state.form.apellido}
                onChange={this.handleChange}
              />
            </FormLabel>

            <Button type="submit" onClick={this.handleSubmit}>
              Confirmar
            </Button>
          </FormControl>
          <p>{this.state.resultado} --> Mostrar error</p>
        </Container>
      </Divider>
    );
  }
}
