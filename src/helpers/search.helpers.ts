import { SelectChangeEvent } from "@mui/material/Select";
import { DogsSearchAction } from "../reducers/search.reducers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encodeQueryParams = (data: Record<string, any>) => {
    const queryParamsList = [];
    for (const d in data) {
        const stringToArray = data[d].split(",");
        if (stringToArray.length > 1) {
            stringToArray.forEach((element: string) => {
                queryParamsList.push(encodeURIComponent(d) + "=" + element);
            });
            continue;
        }
        if (data[d]) {
            queryParamsList.push(encodeURIComponent(d) + "=" + data[d]);
        }
    }
    return queryParamsList.join("&");
};

type Params = Record<string, string | undefined>;

export const convertToParams = (object: object): Params => {
    const params: Params = {};
    Object.entries(object).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params[key] = String(value);
        }
    });
    return params;
};

export const handleRemoveZipCode = (
    idx: number,
    removeZipCodes: (idx: number) => void,
    zipCodes: { zipcode: string }[],
    dispatch: (value: DogsSearchAction) => void
) => {
    removeZipCodes(idx);
    const zipcodeCopy = [...zipCodes];
    zipcodeCopy.splice(idx, 1);
    const updatedZipcodes = zipcodeCopy.map((item) => item.zipcode);
    dispatch({
        type: "SET_ZIPCODES",
        payload: updatedZipcodes,
    });
};

export const handleSortChange = (
    event: SelectChangeEvent,
    dispatch: (value: DogsSearchAction) => void,
    setSort: (value: string) => void
) => {
    setSort(event.target.value);
    if (event.target.value === "rel") {
        dispatch({ type: "SET_SORT", payload: "" });
    } else {
        dispatch({ type: "SET_SORT", payload: event.target.value });
    }
};

export const shouldDisableActions = (
    selectedBreeds: string[],
    ageRange: number[],
    zipCodes: { zipcode: string }[]
) =>
    selectedBreeds.length === 0 &&
    ageRange[0] === 0 &&
    ageRange[1] === 15 &&
    zipCodes.length === 0;
