import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { handleSortChange } from "../../helpers/search.helpers";
import { DogsSearchAction } from "../../reducers/search.reducers";

type SearchSortProps = {
    dispatch: (value: DogsSearchAction) => void;
    sort: string;
    setSort: (value: string) => void;
};

export const SearchSort: FunctionComponent<SearchSortProps> = ({
    dispatch,
    sort,
    setSort,
}) => {
    return (
        <FormControl variant="standard">
            <Typography gutterBottom fontWeight={700}>
                Sort
            </Typography>

            <Select
                labelId="sort-drop-down-label"
                id="sort-drop-down"
                name="sort-drop-down"
                value={sort}
                onChange={(event) => handleSortChange(event, dispatch, setSort)}
                label="Age"
                fullWidth
            >
                <MenuItem value="rel">Relevance</MenuItem>
                <MenuItem value={"breed:asc"}>Ascending: Breed</MenuItem>
                <MenuItem value={"breed:desc"}>Descending: Breed</MenuItem>
                <MenuItem value={"name:asc"}>Ascending: Name</MenuItem>
                <MenuItem value={"name:desc"}>Descending: Name</MenuItem>
                <MenuItem value={"age:asc"}>Ascending: Age</MenuItem>
                <MenuItem value={"age:desc"}>Descending: Age</MenuItem>
            </Select>
        </FormControl>
    );
};
