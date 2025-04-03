import { Button, Typography } from "@mui/material";
import { type FunctionComponent } from "react";
import { Dog } from "../../types/dog.types";
import { ScrollableElement } from "../scrollable-element/scrollable-element.component";
import { FavoriteList } from "./favorite-list.component";

type MatchWidgetProps = {
    favoriteDogs: Dog[];
    setFavoriteDogs: (value: Dog[]) => void;
    getMatch: () => void;
    loading: boolean;
};

export const MatchWidget: FunctionComponent<MatchWidgetProps> = ({
    favoriteDogs,
    setFavoriteDogs,
    getMatch,
    loading,
}) => {
    return (
        <section
            className="flex flex-col gap-y-4 bg-[#f7f7f7] p-4 min-w-xs h-fit rounded-lg border border-gray-200 lg:sticky lg:top-4"
            id="match-widget"
        >
            <div>
                <Typography fontWeight={700}>Favorite Dogs</Typography>
                <div className="flex justify-between items-center">
                    <Typography>
                        Selected dogs: {favoriteDogs.length}
                    </Typography>
                    <Button onClick={() => setFavoriteDogs([])} variant="text">
                        Remove All
                    </Button>
                </div>
            </div>
            {favoriteDogs.length === 0 ? (
                <Typography
                    variant="body2"
                    fontWeight={700}
                    color="textDisabled"
                    fontSize={16}
                >
                    No favorite dogs selected
                </Typography>
            ) : (
                <ScrollableElement
                    Component={({ firstItemRef, lastItemRef }) => (
                        <FavoriteList
                            favoriteDogs={favoriteDogs}
                            setFavoriteDogs={setFavoriteDogs}
                            firstItemRef={firstItemRef}
                            lastItemRef={lastItemRef}
                        />
                    )}
                    hideGradients={favoriteDogs.length <= 1}
                />
            )}
            <Button
                variant="contained"
                type="submit"
                disabled={favoriteDogs.length === 0}
                onClick={getMatch}
                loading={loading}
            >
                <span className="px-8">Find My Match!</span>
            </Button>
        </section>
    );
};
