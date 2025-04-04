import AddIcon from "@mui/icons-material/Add";
import { IconButton, InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { type FunctionComponent } from "react";
import { handleRemoveZipCode } from "../../helpers/search.helpers";
import { DogsSearchAction } from "../../reducers/search.reducers";
import { ZipcodeSearchFacet } from "./zipcode-search-facet.component";

type ZipcodeInputProps = {
    zipCodes: { id: string; zipcode: string }[];
    appendZipCodes: (zipCode: { zipcode: string }) => void;
    removeZipCodes: (index: number) => void;
    setZipcode: (value: string) => void;
    zipcode: string;
    dispatch: (value: DogsSearchAction) => void;
};

export const ZipcodeInput: FunctionComponent<ZipcodeInputProps> = ({
    zipCodes,
    appendZipCodes,
    removeZipCodes,
    setZipcode,
    zipcode,
    dispatch,
}) => {
    return (
        <div className="flex flex-col gap-y-2 mt-[-25px]">
            <FormControl sx={{ m: 1, minWidth: 270 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-search-by-zip-code">
                    Filter by Zip Code
                </InputLabel>
                <Input
                    id="standard-adornment-search-by-zip-code"
                    type={"text"}
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={"search by zip code"}
                                onClick={() => {
                                    appendZipCodes({ zipcode });
                                    setZipcode("");
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <div className="flex gap-2 flex-wrap">
                {zipCodes.map((item, idx) => (
                    <ZipcodeSearchFacet
                        key={item.id}
                        onChange={() =>
                            handleRemoveZipCode(
                                idx,
                                removeZipCodes,
                                zipCodes,
                                dispatch
                            )
                        }
                        zipCode={item.zipcode}
                    />
                ))}
            </div>
        </div>
    );
};
