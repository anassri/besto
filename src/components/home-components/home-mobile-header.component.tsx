import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";
import { type FunctionComponent } from "react";
import { Dog } from "../../types/dog.types";
import { Logo } from "../logo/logo.component";

type HomeMobileHeaderProps = {
    dogMatchData: Dog | null;
    favoriteDogs: Dog[];
    setOpenFilterMenu: (value: boolean) => void;
    openFilterMenu: boolean;
    setOpenFavoriteMenu: (value: boolean) => void;
    openFavoriteMenu: boolean;
    elementForStickyBehaviorInView: boolean;
};

export const HomeMobileHeader: FunctionComponent<HomeMobileHeaderProps> = ({
    dogMatchData,
    favoriteDogs,
    setOpenFavoriteMenu,
    setOpenFilterMenu,
    openFavoriteMenu,
    openFilterMenu,
    elementForStickyBehaviorInView,
}) => {
    return (
        <div
            className={`flex ${
                dogMatchData ? "justify-center" : "justify-between"
            } w-full p-4 sticky top-0 bg-white z-10`}
        >
            {!dogMatchData && (
                <IconButton
                    aria-label={"search by zip code"}
                    onClick={() => {
                        setOpenFilterMenu(!openFilterMenu);
                        setOpenFavoriteMenu(false);
                    }}
                    className="self-start"
                >
                    {openFilterMenu ? <MenuOpenIcon /> : <MenuIcon />}
                </IconButton>
            )}
            <Logo
                shouldScaleDown={
                    !elementForStickyBehaviorInView ||
                    openFilterMenu ||
                    openFavoriteMenu
                }
            />
            {!dogMatchData && (
                <IconButton
                    aria-label={"search by zip code"}
                    onClick={() => {
                        setOpenFavoriteMenu(!openFavoriteMenu);
                        setOpenFilterMenu(false);
                    }}
                    className="self-start relative"
                >
                    {openFavoriteMenu ? (
                        <CloseIcon />
                    ) : (
                        <>
                            <FavoriteBorderIcon />
                            <div className="absolute bottom-0.5 right-0.5 bg-[#d32f2f] rounded-full text-sm px-1 text-white">
                                {favoriteDogs.length}
                            </div>
                        </>
                    )}
                </IconButton>
            )}
        </div>
    );
};
