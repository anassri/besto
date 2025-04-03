import { useEffect, useState } from "react";
import { fetchData } from "../helpers/auth.helpers";
import { convertToParams, encodeQueryParams } from "../helpers/search.helpers";
import {
    Dog,
    DogSearchInputs,
    DogSearchResponse,
    Match,
} from "../types/dog.types";
import { useResolveQueryResponse } from "./common.hooks";

export const useSearchDogs = () => {
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [searchData, setSearchData] = useState<DogSearchResponse | null>(
        null
    );
    const resolveResponse = useResolveQueryResponse<DogSearchResponse>(
        setSearchError,
        setSearchData
    );

    const { getDogs, error, data } = useDogs();

    useEffect(() => {
        if (error) {
            setSearchError(error);
        }
    }, [error]);

    useEffect(() => {
        setSearchLoading(false);
    }, [data]);

    useEffect(() => {
        if (searchData?.resultIds) {
            getDogs(searchData.resultIds).catch((error) =>
                console.error(error)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData?.resultIds]);

    const search = async (
        data: DogSearchInputs,
        customQueryUrl?: string
    ): Promise<void> => {
        setSearchLoading(true);
        const searchParams = encodeQueryParams(convertToParams(data));
        try {
            const response = await fetchData(
                customQueryUrl
                    ? `${customQueryUrl}`
                    : `/dogs/search?${searchParams}`,
                "GET"
            );
            await resolveResponse(response);
        } catch (error) {
            console.error(error);
            setSearchLoading(false);
        }
    };

    return {
        search,
        searchLoading,
        searchError,
        searchData,
        dogs: data,
    };
};

export const useDogsBreeds = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [data, setData] = useState<string[]>([]);
    const resolveResponse = useResolveQueryResponse<string[]>(
        setErrors,
        setData
    );

    const getBreeds = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetchData("/dogs/breeds", "GET");
            await resolveResponse(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        getBreeds,
        loading,
        errors,
        data,
    };
};

export const useDogs = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Dog[]>([]);
    const resolveResponse = useResolveQueryResponse<Dog[]>(setError, setData);

    const getDogs = async (dogIds: string[]): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetchData("/dogs", "POST", dogIds);
            await resolveResponse(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        getDogs,
        loading,
        error,
        data,
    };
};

export const useDogMatch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Match | null>(null);
    const [match, setMatch] = useState<Dog | null>(null);
    const resolveResponse = useResolveQueryResponse<Match>(setError, setData);

    const { getDogs, error: dogsErrors, data: dogsData } = useDogs();

    useEffect(() => {
        if (dogsErrors) {
            setError(dogsErrors);
        }
    }, [dogsErrors]);

    useEffect(() => {
        setMatch(dogsData[0]);
    }, [dogsData]);

    useEffect(() => {
        if (data?.match) {
            getDogs([data.match]).catch((error) => console.error(error));
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.match]);

    const getMatch = async (favoriteDogIds: string[]): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetchData(
                "/dogs/match",
                "POST",
                favoriteDogIds
            );
            await resolveResponse(response);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const resetData = () => {
        setMatch(null);
        setData(null);
    };

    return {
        getMatch,
        loading,
        error,
        data: match,
        resetData,
    };
};
