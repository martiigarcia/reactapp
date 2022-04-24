import React, { Component } from "react";
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
      <div>
        <Divider className="estiloCrearEstudiante">
          <Container
            maxWidth="m"
            component={Paper}
            sx={{ mb: "20px", pt: "10px" }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 400,
                bgcolor: "background.paper",
              }}
            >
              <ListItem>
                <p>
                  Complete los siguientes campos<br></br> para registrar un
                  estudiante:
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
                    width: 300,
                  }}
                  id="outlined-select-currency"
                  select
                  label="Cursos"
                  onChange={this.handleChange}
                  helperText="Seleccione un curso de la lista"
                >
                  {this.state.listaCursos.map((c) => (
                    <MenuItem value={c.id}>{c.curso}</MenuItem>
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
                    sx={{ m: 1 }}
                    variant="standard"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                    value={this.state.form.nombre}
                    onChange={this.handleChange}
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
                    sx={{ m: 1 }}
                    variant="standard"
                    placeholder="Apellido"
                    type="text"
                    name="apellido"
                    value={this.state.form.apellido}
                    onChange={this.handleChange}
                  />
                </FormLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    ml: "125px",
                    width: "100px",
                    borderColor: "secondary.main",
                    pt: "5px",
                    color: "black",
                  }}
                  onClick={this.handleSubmit}
                >
                  Confirmar
                </Button>
              </ListItem>
              <ListItem></ListItem>
              <p>{this.state.resultado ? "" : "-->Mostrar error"}</p>
            </List>
          </Container>
        </Divider>
      </div>
    );
  }
}
