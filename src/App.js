import logo from "./logo.svg";
import "./App.css";

import Estudiante from "./Estudiante";
import Cursos from "./Cursos";
import CrearEstudiante from "./CrearEstudiante";

function App() {
  return (
    <>
      <Estudiante />
      <Cursos />
      <CrearEstudiante />
    </>
  );
}

export default App;
