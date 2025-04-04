import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle, IconButton, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { type FunctionComponent, useEffect } from "react";

type AlertMessageProps = {
    errorMessages: string[];
    setErrorMessages: (value: string[]) => void;
    resetErrorMessages: () => void;
};

export const AlertMessage: FunctionComponent<AlertMessageProps> = ({
    errorMessages,
    setErrorMessages,
    resetErrorMessages,
}) => {
    useEffect(() => {
        if (errorMessages.length > 0) {
            const timer = setTimeout(() => {
                setErrorMessages([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessages]);

    return (
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
    );
};
