import { ThemeProvider } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle, createTheme, IconButton, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
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
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        if (errorMessages.length > 0) {
            const timer = setTimeout(() => {
                setErrorMessages([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessages]);

    const resetErrorMessages = () => {
        setErrorMessages([]);
    };
    console.log("errorMessages", errorMessages);
    return (
        <ThemeProvider theme={theme}>
            {errorMessages.length > 0 && (
                <div className="absolute right-0 px-4 z-20 w-full lg:max-w-[600px] fixed bottom-0">
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close alert"
                                color="inherit"
                                size="small"
                                onClick={resetErrorMessages}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        <AlertTitle>The following error(s) occured:</AlertTitle>
                        {errorMessages.map((error) => (
                            <Typography key={error}>&bull; {error}</Typography>
                        ))}
                    </Alert>
                </div>
            )}
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Home setErrorMessages={setErrorMessages} />}
                    />
                    <Route
                        path="/login"
                        element={<Login setErrorMessages={setErrorMessages} />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
