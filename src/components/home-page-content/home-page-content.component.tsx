import { TablePagination, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import {
    handleChangePage,
    handleChangeResultsPerPage,
} from "../../helpers/home.helpers";
import { useLocations } from "../../hooks/location.hooks";
import { DogsSearchAction } from "../../reducers/search.reducers";
import { Dog, DogSearchResponse } from "../../types/dog.types";
import { DogCardSkeleton } from "../dog-card/dog-card-skeleton.component";
import { DogCard } from "../dog-card/dog-card.component";
import "./home-page-content.css";

type HomePageContentProps = {
    searchData: DogSearchResponse | null;
    dogs: Dog[];
    isloading: boolean;
    changePage: (customUrl: string) => void;
    dispatch: (value: DogsSearchAction) => void;
    favoriteDogs: Dog[];
    setFavoriteDogs: (value: Dog[]) => void;
};

export const HomePageContent: FunctionComponent<HomePageContentProps> = ({
    dogs,
    isloading,
    searchData,
    changePage,
    dispatch,
    favoriteDogs,
    setFavoriteDogs,
}) => {
    const [resultsPerPage, setResultsPerPage] = useState(25);
    const { getLocations, data: locationsData } = useLocations();
    const aggregatedZipCodes = dogs.map((dog) => dog.zip_code);
    const from = new URLSearchParams(searchData?.next || "").get("from");
    const currentPage =
        (parseInt(from || "1", 10) - resultsPerPage) / Number(resultsPerPage);

    useEffect(() => {
        getLocations(aggregatedZipCodes).catch((error) => console.error(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dogs]);

    return (
        <div className="flex flex-col gap-y-8 justify-between lg:max-w-[616px]">
            <div className="flex flex-wrap gap-4 md:justify-center lg:justify-start items-center w-full">
                {isloading ? (
                    <DogCardSkeleton />
                ) : dogs.length > 0 ? (
                    dogs.map((dog) => (
                        <DogCard
                            key={dog.id}
                            dog={dog}
                            favoriteDogs={favoriteDogs}
                            setFavoriteDogs={setFavoriteDogs}
                            // filtering null results
                            location={locationsData
                                ?.filter(Boolean)
                                .find(
                                    (location) =>
                                        location.zip_code === dog.zip_code
                                )}
                        />
                    ))
                ) : (
                    <div className="flex flex-col gap-y-2 items-center text-center w-full h-[61vh] md:h-[65vh] lg:h-none">
                        <Typography
                            variant="h2"
                            fontWeight={700}
                            color="textDisabled"
                            fontSize={36}
                            className="self-center"
                        >
                            No dogs found :-(
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={400}
                            color="textDisabled"
                            fontSize={20}
                            className="self-center"
                        >
                            Try changing your search criteria
                        </Typography>
                    </div>
                )}
            </div>

            <div className="self-center flex flex-col items-center">
                <TablePagination
                    id="table-pagination"
                    component="div"
                    count={searchData?.total || 0}
                    page={currentPage}
                    onPageChange={(event, value) =>
                        handleChangePage(
                            event,
                            value,
                            changePage,
                            dispatch,
                            currentPage,
                            searchData
                        )
                    }
                    rowsPerPage={resultsPerPage}
                    labelRowsPerPage="Dogs per page"
                    onRowsPerPageChange={(event) =>
                        handleChangeResultsPerPage(
                            event,
                            setResultsPerPage,
                            dispatch
                        )
                    }
                    className="css-1gak8h1-MuiToolbar-root-MuiTablePagination-toolbar"
                />
            </div>
        </div>
    );
};
