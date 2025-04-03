import { useNavigate } from "react-router-dom";

export const useResolveQueryResponse = <T>(
    setErrors: (error: string) => void,
    setData: (data: T) => void
) => {
    const navigate = useNavigate();

    const resolveResponse = async (response: Response) => {
        if (response.status === 401) {
            setErrors("Unauthorized");
            navigate("/login");
        } else if (response.status === 200) {
            const body = await response.json();
            setData(body);
        } else {
            setErrors("An error has occurred");
        }
    };

    return resolveResponse;
};
