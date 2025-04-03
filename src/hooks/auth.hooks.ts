import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../helpers/auth.helpers";
import type { LoginInputs } from "../types/auth.types";

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const logIn = async (data: LoginInputs): Promise<void | string> => {
        try {
            setLoading(true);
            const response = await fetchData("/auth/login", "POST", data);
            if (response.status !== 200) {
                setError("An error has occurred");
            }
            setLoading(false);
            return;
        } catch (error) {
            setLoading(false);
            setError(error as string);
        }
    };

    const logOut = async () => {
        try {
            setLoading(true);
            const response = await fetchData("/auth/logout", "POST");
            if (response.status === 200) {
                navigate("/login");
            } else {
                setError("An error has occurred");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error as string);
        }
    };

    return {
        logIn,
        logOut,
        loading,
        error,
    };
};
