import { DogsSearchAction } from "../reducers/search.reducers";
import type { Dog, DogSearchResponse } from "../types/dog.types";

export const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    value: number,
    changePage: (customUrl: string) => void,
    dispatch: (value: DogsSearchAction) => void,
    currentPage: number,
    searchData: DogSearchResponse | null
) => {
    if (value === currentPage + 1) {
        changePage(searchData?.next || "");
    } else if (value === currentPage - 1) {
        changePage(searchData?.prev || "");
    } else {
        dispatch({
            type: "SET_FROM",
            payload: value,
        });
    }
};

export const handleChangeResultsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setResultsPerPage: (value: number) => void,
    dispatch: (value: DogsSearchAction) => void
) => {
    setResultsPerPage(parseInt(event.target.value, 10));
    dispatch({
        type: "SET_SIZE",
        payload: parseInt(event.target.value, 10),
    });
};

export const resetMatch = (
    resetDogMatchData: () => void,
    dispatch: (value: DogsSearchAction) => void,
    setFavoriteDogs: (favoriteDogs: Dog[]) => void,
    setOpenFavoriteMenu: (value: boolean) => void,
    setOpenFilterMenu: (value: boolean) => void
) => {
    resetDogMatchData();
    dispatch({ type: "SET_AGE_MAX", payload: 15 });
    dispatch({ type: "SET_AGE_MIN", payload: 0 });
    dispatch({ type: "SET_BREEDS", payload: [] });
    dispatch({ type: "SET_FROM", payload: 1 });
    dispatch({ type: "SET_SIZE", payload: 25 });
    dispatch({ type: "SET_SORT", payload: "" });
    setFavoriteDogs([]);
    setOpenFavoriteMenu(false);
    setOpenFilterMenu(false);
};
