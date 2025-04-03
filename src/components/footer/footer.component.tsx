import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, type FunctionComponent } from "react";
import { useAuth } from "../../hooks/auth.hooks";
import { GeneralErrorProps } from "../../types/general.types";

export const Footer: FunctionComponent<GeneralErrorProps> = ({
    setErrorAlertOpen,
    setErrorMessages,
}) => {
    const { logOut, errors, loading } = useAuth();

    useEffect(() => {
        if (errors) {
            setErrorMessages((prevState) => [...prevState, errors]);
            setErrorAlertOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    return (
        <div className="mb-8 self-center flex flex-col items-center">
            <Button
                variant="text"
                size="small"
                onClick={logOut}
                loading={loading}
            >
                Logout
            </Button>
            <Typography variant="body1" color="textDisabled" fontSize={12}>
                Besto was created by Ammar Nassri for Fetch.
            </Typography>
        </div>
    );
};
