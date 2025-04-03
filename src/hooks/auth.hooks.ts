import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../helpers/auth.helpers";
import type { LoginInputs } from "../types/auth.types";

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(null);
    const navigate = useNavigate();

    const logIn = async (data: LoginInputs): Promise<void | string> => {
        try {
            setLoading(true);
            const response = await fetchData("/auth/login", "POST", data);
            if (response.status !== 200) {
                setErrors("An error has occurred");
            }
            setLoading(false);
            return;
        } catch (error) {
            setLoading(false);
            setErrors(error as string);
        }
    };

    const logOut = async () => {
        try {
            setLoading(true);
            const response = await fetchData("/auth/logout", "POST");
            if (response.status === 200) {
                navigate("/login");
            } else {
                setErrors("An error has occurred");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrors(error as string);
        }
    };

    return {
        logIn,
        logOut,
        loading,
        errors,
    };
};
