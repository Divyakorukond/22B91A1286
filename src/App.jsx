import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UrlProvider } from "./context/UrlContext";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./components/RedirectHandler";
import { AppBar, Toolbar, Button, Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#197278",
    },
    secondary: {
      main: "#fbb13c",
    },
    background: {
      default: "#f4f7fa",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial',
    h4: {
      fontWeight: 700,
      letterSpacing: 1.2,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px 0 rgba(25, 114, 120, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UrlProvider>
        <Router>
          <AppBar position="static" color="primary" elevation={2} sx={{ borderRadius: 2, mt: 2, mx: 'auto', maxWidth: 1100 }}>
            <Toolbar>
              <Button color="inherit" component={Link} to="/" sx={{ fontSize: 18, mr: 2 }}>
                Shorten URL
              </Button>
              <Button color="secondary" variant="contained" component={Link} to="/stats" sx={{ fontSize: 18, ml: 1 }}>
                Statistics
              </Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" sx={{ mt: 6, mb: 4, p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #f4f7fa 60%, #e0fbfc 100%)', boxShadow: 3 }}>
            <Routes>
              <Route path="/" element={<ShortenerPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path=":shortcode" element={<RedirectHandler />} />
            </Routes>
          </Container>
        </Router>
      </UrlProvider>
    </ThemeProvider>
  );
}

export default App;


