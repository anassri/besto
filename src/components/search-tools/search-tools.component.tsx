import { Slider, Typography } from "@mui/material";
import { type FunctionComponent, useEffect, useState } from "react";
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { shouldDisableActions } from "../../helpers/search.helpers";
import { useBreakpoints } from "../../hooks/breakpoints.hooks";
import { DogsSearchAction } from "../../reducers/search.reducers";
import { ScrollableElement } from "../scrollable-element/scrollable-element.component";
import { BreedsList } from "./breeds-list.component";
import { SearchActions } from "./search-actions.component";
import { SearchSort } from "./search-sort.component";
import { ZipcodeInput } from "./zipcode-input.component";

type SearchToolsProps = Omit<
    SearchToolsContainerProps,
    "getBreeds" | "openFilterMenu"
>;

export const SearchTools: FunctionComponent<SearchToolsProps> = ({
    dispatch,
    loading,
    data,
}) => {
    const [sort, setSort] = useState<string>("rel");
    const [zipcode, setZipcode] = useState<string>("");

    const { control, register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            ageRange: [0, 15] as [number, number],
            selectedBreeds: [] as string[],
            zipCodes: [] as { zipcode: string }[],
        },
        mode: "onBlur",
    });

    const {
        fields: zipCodes,
        append: appendZipCodes,
        remove: removeZipCodes,
    } = useFieldArray({
        control,
        name: "zipCodes",
    });

    const onSubmit: SubmitHandler<{
        ageRange: [number, number];
        selectedBreeds: string[];
        zipCodes: { zipcode: string }[];
    }> = (data) => {
        dispatch({ type: "SET_BREEDS", payload: data.selectedBreeds });
        dispatch({ type: "SET_AGE_MIN", payload: data.ageRange[0] });
        dispatch({ type: "SET_AGE_MAX", payload: data.ageRange[1] });
        const zipCodesToSearch = data.zipCodes.map((item) => item.zipcode);
        dispatch({ type: "SET_ZIPCODES", payload: zipCodesToSearch });
    };

    const onResetForm = () => {
        reset();
    };

    const ageRange = watch("ageRange");
    const selectedBreeds = watch("selectedBreeds");

    const shouldDisableApplyButton = shouldDisableActions(
        selectedBreeds,
        ageRange,
        zipCodes
    );

    const onResetFormClick = () => {
        dispatch({ type: "SET_AGE_MAX", payload: 15 });
        dispatch({ type: "SET_AGE_MIN", payload: 0 });
        dispatch({ type: "SET_BREEDS", payload: [] });
        dispatch({ type: "SET_FROM", payload: 1 });
        dispatch({ type: "SET_SIZE", payload: 25 });
        onResetForm();
    };

    useEffect(() => {
        if (selectedBreeds.length === 0) {
            onResetForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="flex flex-col gap-y-4 w-full lg:w-auto lg:max-w-[320px] h-fit lg:sticky lg:top-4"
            id="search-tools"
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-8 bg-[#f7f7f7] p-4 min-w-xs h-fit rounded-lg border border-gray-200"
            >
                <SearchSort dispatch={dispatch} sort={sort} setSort={setSort} />
                <div className="max-w-[97%]">
                    <Typography gutterBottom fontWeight={700}>
                        Age
                    </Typography>
                    <div className="pl-3">
                        <Controller
                            control={control}
                            name="ageRange"
                            render={({ field: { onChange } }) => (
                                <Slider
                                    getAriaLabel={() => "Temperature range"}
                                    value={ageRange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={25}
                                    marks={[
                                        { value: 0, label: "0" },
                                        { value: 13, label: "13" },
                                        { value: 25, label: "25" },
                                    ]}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                </div>
                <div>
                    <Typography gutterBottom fontWeight={700}>
                        Breed
                    </Typography>
                    <ScrollableElement
                        Component={({ firstItemRef, lastItemRef }) => (
                            <BreedsList
                                loading={loading}
                                data={data}
                                selectedBreeds={selectedBreeds}
                                register={register}
                                firstItemRef={firstItemRef}
                                lastItemRef={lastItemRef}
                            />
                        )}
                    />
                </div>

                <ZipcodeInput
                    zipCodes={zipCodes}
                    appendZipCodes={appendZipCodes}
                    removeZipCodes={removeZipCodes}
                    setZipcode={setZipcode}
                    zipcode={zipcode}
                    dispatch={dispatch}
                />

                <SearchActions
                    shouldDisableApplyButton={shouldDisableApplyButton}
                    onResetForm={onResetFormClick}
                />
            </form>
        </div>
    );
};

type SearchToolsContainerProps = {
    dispatch: (value: DogsSearchAction) => void;
    getBreeds: () => Promise<void>;
    loading: boolean;
    data: string[];
    openFilterMenu: boolean;
};

export const SearchToolsContainer: FunctionComponent<
    SearchToolsContainerProps
> = ({ getBreeds, data, openFilterMenu, ...restProps }) => {
    const { isLarge } = useBreakpoints();

    useEffect(() => {
        if (data.length === 0) {
            getBreeds().catch((error) => console.error(error));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return !isLarge ? (
        openFilterMenu ? (
            <SearchTools data={data} {...restProps} />
        ) : null
    ) : (
        <SearchTools data={data} {...restProps} />
    );
};
