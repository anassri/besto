import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { type FunctionComponent } from "react";

type ZipcodeSearchFacetProps = {
    onChange: () => void;
    zipCode: string;
};
export const ZipcodeSearchFacet: FunctionComponent<ZipcodeSearchFacetProps> = ({
    onChange,
    zipCode,
}) => {
    return (
        <div className="flex justify-between items-center border border-[#d7d7d7] pr-1 pl-4 rounded-full bg-[#ebebeb]">
            {zipCode}
            <IconButton aria-label="remove zip code" onClick={onChange}>
                <CloseIcon />
            </IconButton>
        </div>
    );
};
