import { DogSearchInputs } from "../types/dog.types";

export const QUERY_INPUT_INITIAL_STATE: DogSearchInputs = {
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 99,
    size: 100,
    from: 0,
    sort: "",
};
