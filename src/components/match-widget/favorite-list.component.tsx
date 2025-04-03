import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import { type FunctionComponent } from "react";
import { Dog } from "../../types/dog.types";

type FavoriteListProps = {
    favoriteDogs: Dog[];
    firstItemRef: (node?: Element | null) => void;
    lastItemRef: (node?: Element | null) => void;
    setFavoriteDogs: (value: Dog[]) => void;
};

export const FavoriteList: FunctionComponent<FavoriteListProps> = ({
    favoriteDogs,
    setFavoriteDogs,
    firstItemRef,
    lastItemRef,
}) => {
    const applyProperRef = (idx: number) => {
        if (idx === 0) {
            return firstItemRef;
        } else if (idx === favoriteDogs.length - 1) {
            return lastItemRef;
        }
    };

    return (
        <div
            className="max-h-[500px] overflow-y-auto"
            style={{ scrollbarColor: "#c0c0c0 transparent" }}
        >
            <div className="flex flex-col gap-y-4">
                {favoriteDogs.map((dog, idx) => (
                    <div
                        key={dog.id}
                        className="flex justify-between items-center"
                        ref={applyProperRef(idx)}
                    >
                        <div className="flex gap-x-4 items-center">
                            <img
                                src={dog.img}
                                alt={`${dog.name} the dog`}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex items-center gap-x-2">
                                <Typography>{dog.name}</Typography>
                                <Typography>-</Typography>
                                <Typography
                                    color="textDisabled"
                                    fontSize={12}
                                    className="truncate max-w-[120px]"
                                >
                                    {dog.breed}
                                </Typography>
                            </div>
                        </div>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={() =>
                                setFavoriteDogs(
                                    favoriteDogs.filter(
                                        (favoriteDog) =>
                                            favoriteDog.id !== dog.id
                                    )
                                )
                            }
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
        </div>
    );
};
