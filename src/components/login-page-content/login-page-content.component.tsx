import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { type FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks";
import type { LoginInputs } from "../../types/auth.types";
import { GeneralErrorProps } from "../../types/general.types";
import { Background } from "../background/background.component";
import { Footer } from "../footer/footer.component";
import { Logo } from "../logo/logo.component";

export const LoginPageContent: FunctionComponent<GeneralErrorProps> = ({
    setErrorMessages,
}) => {
    const { logIn, loading, error: requestErrors } = useAuth();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
        },
        mode: "onBlur",
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInputs> = (data) =>
        logIn(data)
            .then(() => {
                if (!requestErrors) {
                    navigate("/");
                } else {
                    setError("email", {
                        type: "manual",
                        message: requestErrors,
                    });
                }
            })
            .catch((error) => console.error(error));

    return (
        <main className="flex justify-center w-full">
            <div className="flex flex-col gap-y-4 items-center w-full px-4 md:max-w-lg">
                <Logo />
                <Paper elevation={3} className="w-full">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-y-8 w-full px-12 py-16"
                    >
                        <h1 className="text-3xl font-bold">Login</h1>
                        <TextField
                            label="Name"
                            id="name"
                            variant="standard"
                            {...register("name", { required: true })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            label="Email"
                            id="email"
                            variant="standard"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <Button
                            variant="contained"
                            disableElevation
                            type="submit"
                            loading={loading}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
                <Footer setErrorMessages={setErrorMessages} hideLogoutButton />
            </div>
            <Background />
        </main>
    );
};
