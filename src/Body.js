import React, { Component } from "react";

import Estudiante from "./Estudiante";
import Cursos from "./Cursos";
import CrearEstudiante from "./CrearEstudiante";

export default class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div fluid className="body">
        {this.props.itemClicked === 0 && <Estudiante />}
        {this.props.itemClicked === 1 && <Cursos />}
        {this.props.itemClicked === 2 && (
          <CrearEstudiante inputValue={this.props.inputValue} />
        )}
      </div>
    );
  }
}
