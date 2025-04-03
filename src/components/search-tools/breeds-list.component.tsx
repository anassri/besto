import { Checkbox, Skeleton, Typography } from "@mui/material";
import { type FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";

type BreedsListProps = {
    loading: boolean;
    data: string[];
    firstItemRef: (node?: Element | null) => void;
    lastItemRef: (node?: Element | null) => void;
    selectedBreeds: string[];
    register: UseFormRegister<{
        ageRange: [number, number];
        selectedBreeds: string[];
        zipCodes: {
            zipcode: string;
        }[];
    }>;
};

export const BreedsList: FunctionComponent<BreedsListProps> = ({
    loading,
    data,
    firstItemRef,
    lastItemRef,
    selectedBreeds,
    register,
}) => {
    return (
        <div
            className="h-[330px] lg:h-[700px] overflow-y-auto"
            style={{ scrollbarColor: "#c0c0c0 transparent" }}
        >
            {loading ? (
                <div className="flex flex-col gap-y-2">
                    {new Array(20).fill({}).map((_, idx) => (
                        <Skeleton
                            variant="rounded"
                            width={150}
                            height={20}
                            key={idx}
                        />
                    ))}
                </div>
            ) : (
                data.map((breed, idx) => (
                    <div
                        key={breed}
                        ref={
                            idx === 0
                                ? firstItemRef
                                : idx === data.length - 1
                                ? lastItemRef
                                : undefined
                        }
                        className="flex items-center gap-x-1"
                    >
                        <Checkbox
                            {...register("selectedBreeds")}
                            value={breed}
                            checked={selectedBreeds.includes(breed)}
                        />
                        <Typography>{breed}</Typography>
                    </div>
                ))
            )}
        </div>
    );
};
