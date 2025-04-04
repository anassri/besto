import Button from "@mui/material/Button";
import { type FunctionComponent } from "react";

type SearchActionsProps = {
    onResetForm: () => void;
    shouldDisableApplyButton: boolean;
};
export const SearchActions: FunctionComponent<SearchActionsProps> = ({
    onResetForm,
    shouldDisableApplyButton,
}) => {
    return (
        <div className="flex justify-end gap-x-6">
            <Button onClick={onResetForm} disabled={shouldDisableApplyButton}>
                Reset
            </Button>

            <Button
                variant="contained"
                type="submit"
                disabled={shouldDisableApplyButton}
            >
                <span className="px-8">Apply</span>
            </Button>
        </div>
    );
};
