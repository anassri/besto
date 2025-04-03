import { useEffect, useReducer, useState, type FunctionComponent } from "react";
import { useInView } from "react-intersection-observer";
import { Footer } from "../components/footer/footer.component";
import { HomeMobileHeader } from "../components/home-components/home-mobile-header.component";
import { HomePageContent } from "../components/home-page-content/home-page-content.component";
import { Logo } from "../components/logo/logo.component";
import { MatchContent } from "../components/match-content/match-content.component";
import { MatchWidget } from "../components/match-widget/match-widget.component";
import { SearchToolsContainer } from "../components/search-tools/search-tools.component";
import { scrollToElement } from "../helpers/general.helpers";
import { resetMatch } from "../helpers/home.helpers";
import { useBreakpoints } from "../hooks/breakpoints.hooks";
import { useDogMatch, useDogsBreeds, useSearchDogs } from "../hooks/dogs.hooks";
import { dogSearchReducer } from "../reducers/search.reducers";
import { type Dog } from "../types/dog.types";
import { GeneralErrorProps } from "../types/general.types";

const Home: FunctionComponent<GeneralErrorProps> = ({
    setErrorAlertOpen,
    setErrorMessages,
}) => {
    const { search, searchData, searchLoading, searchErrors, dogs } =
        useSearchDogs();
    const {
        getBreeds,
        data: dogBreedsData,
        errors: dogBreedsErrors,
        loading: dogBreedsLoading,
    } = useDogsBreeds();
    const {
        getMatch,
        loading: dogMatchLoading,
        errors: dogMatchErrors,
        data: dogMatchData,
        resetData: resetDogMatchData,
    } = useDogMatch();
    const [{ breeds, zipCodes, ageMax, ageMin, size, from, sort }, dispatch] =
        useReducer(dogSearchReducer, {});

    const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(false);
    const [openFavoriteMenu, setOpenFavoriteMenu] = useState<boolean>(false);

    const {
        ref: elementForStickyBehaviorRef,
        inView: elementForStickyBehaviorInView,
    } = useInView({ skip: openFilterMenu });

    const { isLarge, isMedium } = useBreakpoints();

    const changePage = (customUrl: string) => {
        search(
            {
                breeds,
                zipCodes,
                ageMax,
                ageMin,
                size,
                from,
                sort,
            },
            customUrl
        ).catch((error) => console.error(error));
    };

    useEffect(() => {
        search({
            breeds,
            zipCodes,
            ageMax,
            ageMin,
            size,
            from,
            sort,
        }).catch((error) => console.error(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breeds, zipCodes, ageMax, ageMin, size, from, sort]);

    useEffect(() => {
        if (openFilterMenu && !elementForStickyBehaviorInView) {
            scrollToElement("search-tools", 100);
        }
        if (openFavoriteMenu && !elementForStickyBehaviorInView) {
            scrollToElement("match-widget", 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openFilterMenu, openFavoriteMenu]);

    useEffect(() => {
        if (searchErrors) {
            setErrorMessages((prevState) => [...prevState, searchErrors]);
            setErrorAlertOpen(true);
        }
        if (dogMatchErrors) {
            setErrorMessages((prevState) => [...prevState, dogMatchErrors]);
            setErrorAlertOpen(true);
        }
        if (dogBreedsErrors) {
            setErrorMessages((prevState) => [...prevState, dogBreedsErrors]);
            setErrorAlertOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dogMatchErrors, dogBreedsErrors, searchErrors]);

    const getMatchData = () => {
        const dogIds = favoriteDogs.map((dog) => dog.id);
        getMatch(dogIds).catch((error) => console.error(error));
    };

    return (
        <div
            className={`flex flex-col items-center justify-between ${
                dogMatchData ? "h-screen" : "h-full"
            } gap-y-2 lg:gap-y-8 relative`}
            style={{
                backgroundImage:
                    "linear-gradient(to right bottom, #ffffff, #f5f5f5, #ebebeb, #e1e1e1, #d7d7d7)",
            }}
        >
            {isLarge ? (
                <Logo />
            ) : (
                <HomeMobileHeader
                    dogMatchData={dogMatchData}
                    favoriteDogs={favoriteDogs}
                    setOpenFavoriteMenu={setOpenFavoriteMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    openFavoriteMenu={openFavoriteMenu}
                    openFilterMenu={openFilterMenu}
                    elementForStickyBehaviorInView={
                        elementForStickyBehaviorInView
                    }
                />
            )}

            {dogMatchData ? (
                <MatchContent
                    resetMatch={() =>
                        resetMatch(
                            resetDogMatchData,
                            dispatch,
                            setFavoriteDogs,
                            setOpenFavoriteMenu,
                            setOpenFilterMenu
                        )
                    }
                    dog={dogMatchData}
                />
            ) : (
                <div className="flex flex-col lg:flex-row justify-center p-4 pt-2 lg:pt-4 pb-0 gap-x-4 gap-y-2 lg:gap-y-0 w-full lg:w-auto">
                    {openFavoriteMenu && !isMedium && !isLarge && (
                        <MatchWidget
                            favoriteDogs={favoriteDogs}
                            setFavoriteDogs={setFavoriteDogs}
                            getMatch={getMatchData}
                            loading={dogMatchLoading}
                        />
                    )}
                    <SearchToolsContainer
                        dispatch={dispatch}
                        getBreeds={getBreeds}
                        loading={dogBreedsLoading}
                        data={dogBreedsData}
                        openFilterMenu={openFilterMenu}
                    />
                    <div
                        className="block lg:hidden"
                        ref={elementForStickyBehaviorRef}
                    />
                    <div className="flex flex-col gap-y-4 w-full">
                        {openFavoriteMenu && isMedium && (
                            <div className="hidden md:block lg:hidden">
                                <MatchWidget
                                    favoriteDogs={favoriteDogs}
                                    setFavoriteDogs={setFavoriteDogs}
                                    getMatch={getMatchData}
                                    loading={dogMatchLoading}
                                />
                            </div>
                        )}

                        <HomePageContent
                            dogs={dogs}
                            isloading={searchLoading}
                            searchData={searchData}
                            changePage={changePage}
                            dispatch={dispatch}
                            favoriteDogs={favoriteDogs}
                            setFavoriteDogs={setFavoriteDogs}
                        />
                    </div>

                    {isLarge && (
                        <MatchWidget
                            favoriteDogs={favoriteDogs}
                            setFavoriteDogs={setFavoriteDogs}
                            getMatch={getMatchData}
                            loading={dogMatchLoading}
                        />
                    )}
                </div>
            )}
            <Footer
                setErrorAlertOpen={setErrorAlertOpen}
                setErrorMessages={setErrorMessages}
            />
        </div>
    );
};

export default Home;
