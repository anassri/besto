import { Button, Typography } from "@mui/material";
import { type FunctionComponent } from "react";
import { useInView } from "react-intersection-observer";
import { Dog } from "../../types/dog.types";
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
    const { ref: firstItemRef, inView: firstItemInView } = useInView();
    const { ref: lastItemRef, inView: lastItemInView } = useInView();
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
                <div className="relative">
                    {!firstItemInView && favoriteDogs.length > 1 && (
                        <div
                            className="absolute w-full h-[50px] top-0"
                            style={{
                                background:
                                    "linear-gradient(#f7f7f7,rgba(255,255,255, 0))",
                            }}
                        ></div>
                    )}
                    <FavoriteList
                        favoriteDogs={favoriteDogs}
                        setFavoriteDogs={setFavoriteDogs}
                        firstItemRef={firstItemRef}
                        lastItemRef={lastItemRef}
                    />
                    {!lastItemInView && favoriteDogs.length > 1 && (
                        <div
                            className="absolute w-full h-[50px] bottom-0"
                            style={{
                                background:
                                    "linear-gradient(rgba(255,255,255, 0), #f7f7f7)",
                            }}
                        ></div>
                    )}
                </div>
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
