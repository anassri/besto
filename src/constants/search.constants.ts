import { DogSearchInputs } from "../types/dog.types";

export const QUERY_INPUT_INITIAL_STATE: DogSearchInputs = {
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 15,
    size: 25,
    from: 0,
    sort: "breed:asc",
};
