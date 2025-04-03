import { useState } from "react";
import { fetchData } from "../helpers/auth.helpers";
import {
    Location,
    LocationSearchInputs,
    LocationSearchResponse,
} from "../types/location.types";
import { useResolveQueryResponse } from "./common.hooks";

export const useLocations = () => {
    const [data, setData] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>("");
    const resolveResponse = useResolveQueryResponse<Location[]>(
        setErrors,
        setData
    );

    const getLocations = async (zipCodes: string[]) => {
        setLoading(true);
        setData([]);
        try {
            const response = await fetchData("/locations", "POST", zipCodes);
            await resolveResponse(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { getLocations, data, loading, errors };
};

export const useLocationSearch = () => {
    const [data, setData] = useState<LocationSearchResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>("");
    const resolveResponse = useResolveQueryResponse<LocationSearchResponse>(
        setErrors,
        setData
    );

    const searchLocations = async (SearchParams: LocationSearchInputs) => {
        setLoading(true);
        try {
            const response = await fetchData(
                "/locations/search",
                "POST",
                SearchParams
            );
            await resolveResponse(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { searchLocations, data, loading, errors };
};
