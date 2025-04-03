import type { Dispatch, SetStateAction } from "react";

export type GeneralErrorProps = {
    setErrorMessages: Dispatch<SetStateAction<string[]>>;
};
