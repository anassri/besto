import { BASE_URL } from "../constants/api.constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchData = async (url: string, method = "GET", body?: any) => {
    return fetch(`${BASE_URL}${url}`, {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });
};
