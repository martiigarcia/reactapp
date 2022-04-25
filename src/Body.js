import React, { Component } from "react";

import Estudiante from "./Estudiante";
import Cursos from "./Cursos";
import CrearEstudiante from "./CrearEstudiante";
import Inscripcion from "./Inscripcion";

export default class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div fluid className="body">
        {this.props.itemClicked === 0 && (
          <Estudiante inputValue={this.props.inputValue} />
        )}
        {this.props.itemClicked === 1 && (
          <Cursos inputValue={this.props.inputValue} />
        )}
        {this.props.itemClicked === 2 && <CrearEstudiante />}
        {this.props.itemClicked === 3 && <Inscripcion />}
      </div>
    );
  }
}
