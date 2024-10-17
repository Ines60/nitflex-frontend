import { TextField } from "@mui/material";

export default function TextFieldComponent({
  size,
  label,
  valueGetter,
  valueSetter,
}) {
  return (
    <TextField
      required
      style={{ width: 450, backgroundColor: "", color: "white" }}
      label={label}
      variant="outlined"
      value={valueGetter}
      onChange={(e) => valueSetter(e.target.value)}
      size={"size"}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // Bordure inactif
          },
          "&:hover fieldset": {
            borderColor: "white", // Bordure au survol
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Bordure lors de la saisi
          },
        },
        "& .MuiInputLabel-root": {
          color: "white", // Couleur du label inactif
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white", // Couleur du label quand du texte est saisi
        },
        "& .MuiOutlinedInput-input": {
          color: "white", // Couleur du texte saisi
        },
      }}
    />
  );
}
