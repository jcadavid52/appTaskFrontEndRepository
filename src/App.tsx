
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
// import IndexPage from "./Pages/PageIndex";





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
       
        <h1>Hola mundo</h1>
       
        {/* <IndexPage/> */}
       
       
      </div>
    </ThemeProvider>
  );
}

export default App;
