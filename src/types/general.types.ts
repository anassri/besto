import type { Dispatch, SetStateAction } from "react";

export type GeneralErrorProps = {
    setErrorAlertOpen: (value: boolean) => void;
    setErrorMessages: Dispatch<SetStateAction<string[]>>;
};
