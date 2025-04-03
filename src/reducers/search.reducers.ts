import { type DogSearchInputs } from "../types/dog.types";

export type DogsSearchAction =
    | { type: "SET_BREEDS"; payload: string[] }
    | { type: "SET_ZIPCODES"; payload: string[] }
    | {
          type: "SET_AGE_MIN";
          payload: number;
      }
    | {
          type: "SET_AGE_MAX";
          payload: number;
      }
    | {
          type: "SET_SIZE";
          payload: number;
      }
    | {
          type: "SET_FROM";
          payload: number;
      }
    | { type: "SET_SORT"; payload: string };

export type DogSearchState = DogSearchInputs;

export function dogSearchReducer(
    state: DogSearchState,
    action: DogsSearchAction
): DogSearchState {
    switch (action.type) {
        case "SET_BREEDS":
            return {
                ...state,
                breeds: action.payload,
            };
        case "SET_ZIPCODES":
            return {
                ...state,
                zipCodes: action.payload,
            };
        case "SET_AGE_MIN":
            return {
                ...state,
                ageMin: action.payload,
            };
        case "SET_AGE_MAX":
            return {
                ...state,
                ageMax: action.payload,
            };
        case "SET_SIZE":
            return {
                ...state,
                size: action.payload,
            };
        case "SET_FROM":
            return {
                ...state,
                from: action.payload,
            };
        case "SET_SORT":
            return {
                ...state,
                sort: action.payload,
            };
        default:
            return state;
    }
}
