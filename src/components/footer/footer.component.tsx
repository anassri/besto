import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, type FunctionComponent } from "react";
import { useAuth } from "../../hooks/auth.hooks";
import { GeneralErrorProps } from "../../types/general.types";

export const Footer: FunctionComponent<
    GeneralErrorProps & { hideLogoutButton?: boolean }
> = ({ setErrorAlertOpen, setErrorMessages, hideLogoutButton = false }) => {
    const { logOut, error, loading } = useAuth();

    useEffect(() => {
        if (error) {
            setErrorMessages((prevState) => [...prevState, error]);
            setErrorAlertOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <div className="mb-8 self-center flex flex-col items-center">
            {!hideLogoutButton && (
                <Button
                    variant="text"
                    size="small"
                    onClick={logOut}
                    loading={loading}
                >
                    Logout
                </Button>
            )}
            <Typography variant="body1" color="textDisabled" fontSize={12}>
                Besto was created by Ammar Nassri for Fetch.
            </Typography>
        </div>
    );
};
