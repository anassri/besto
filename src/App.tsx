import { ThemeProvider } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle, createTheme, IconButton, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home.page";
import Login from "./pages/login.page";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#E0C2FF",
            light: "#F5EBFF",
            contrastText: "#47008F",
        },
    },
});

function App() {
    const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(true);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    return (
        <ThemeProvider theme={theme}>
            <Router>
                {errorAlertOpen && errorMessages.length > 0 && (
                    <div className="absolute top-4 left-0 right-0 px-4">
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close alert"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setErrorAlertOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            <AlertTitle>
                                The following error(s) occured:
                            </AlertTitle>
                            {errorMessages.map((error) => (
                                <Typography>&bull; {error}</Typography>
                            ))}
                        </Alert>
                    </div>
                )}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                setErrorAlertOpen={setErrorAlertOpen}
                                setErrorMessages={setErrorMessages}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setErrorAlertOpen={setErrorAlertOpen}
                                setErrorMessages={setErrorMessages}
                            />
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
