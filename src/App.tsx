import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AlertMessage } from "./components/alert-message/alert-message.component";
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

    const resetErrorMessages = () => {
        setErrorMessages([]);
    };
    return (
        <ThemeProvider theme={theme}>
            {errorMessages.length > 0 && (
                <AlertMessage
                    errorMessages={errorMessages}
                    setErrorMessages={setErrorMessages}
                    resetErrorMessages={resetErrorMessages}
                />
            )}
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={<Login setErrorMessages={setErrorMessages} />}
                    />
                    <Route
                        path="/"
                        element={<Home setErrorMessages={setErrorMessages} />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
