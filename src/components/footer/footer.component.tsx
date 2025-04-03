import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, type FunctionComponent } from "react";
import { determineErrorsList } from "../../helpers/general.helpers";
import { useAuth } from "../../hooks/auth.hooks";
import { GeneralErrorProps } from "../../types/general.types";

export const Footer: FunctionComponent<
    GeneralErrorProps & { hideLogoutButton?: boolean }
> = ({ setErrorMessages, hideLogoutButton = false }) => {
    const { logOut, error, loading } = useAuth();

    useEffect(() => {
        if (error) {
            setErrorMessages((prevState) =>
                determineErrorsList(prevState, error)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <div className="mb-8 self-center flex flex-col items-center">
            <div>
                {/* Left this here to test error alerts */}
                <Button
                    onClick={() =>
                        setErrorMessages((prevState) => [
                            ...prevState,
                            "Hello there! You found me. I am an error message.",
                        ])
                    }
                >
                    I'm hiding something
                </Button>
                {!hideLogoutButton && (
                    <>
                        &bull;
                        <Button
                            variant="text"
                            size="small"
                            onClick={logOut}
                            loading={loading}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </div>
            <Typography variant="body1" color="textDisabled" fontSize={12}>
                Besto was created by Ammar Nassri for Fetch.
            </Typography>
        </div>
    );
};
