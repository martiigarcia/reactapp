import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PruebaToggleButon(newalignment) {
  const [alignment, setAlignment] = React.useState(newalignment);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="confirmar">Web</ToggleButton>
    </ToggleButtonGroup>
  );
}
