import TableComponent from "./Components/tableComponent";
import FormComponent from "./Components/FormComponent";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#f2f3f4",
    },
    primary:{
      main:"#d0ece7"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <FormComponent />

        <TableComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
