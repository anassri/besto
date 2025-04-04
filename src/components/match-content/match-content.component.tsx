import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, type FunctionComponent } from "react";
import {
    determineIndefiniteArticle,
    getAgeText,
} from "../../helpers/general.helpers";
import { useLocations } from "../../hooks/location.hooks";
import { Dog } from "../../types/dog.types";

type MatchContentProps = {
    resetMatch: () => void;
    dog: Dog;
};
export const MatchContent: FunctionComponent<MatchContentProps> = ({
    resetMatch,
    dog,
}) => {
    const { getLocations, data } = useLocations();

    useEffect(() => {
        getLocations([dog.zip_code]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="flex flex-col w-full lg:w-auto px-4 lg:px-0 pt-4 lg:pt-0">
            <Paper
                elevation={3}
                className="flex flex-col lg:flex-row items-center w-full max-w-full text-center lg:text-left p-6 lg:p-8"
            >
                <img
                    src={dog.img}
                    alt="logo"
                    className="block lg:hidden w-72 h-72 rounded-full object-cover object-top"
                />
                <div className="flex flex-col gap-y-8 mt-8 lg:mt-0 justify-between w-full lg:h-full lg:w-auto">
                    <div className="lg:mt-24">
                        <Typography variant="h1" fontSize={44} color="primary">
                            We've found a match!
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-y-4 ">
                        <Typography variant="h3" fontSize={32} color="primary">
                            {dog.name}
                        </Typography>
                        <Typography variant="body1" color="primary">
                            {dog.name} is{" "}
                            {determineIndefiniteArticle(dog.breed)} {dog.breed}{" "}
                            and is {getAgeText(dog.age)} and resides in{" "}
                            {data[0]?.city}, {data[0]?.state}.
                        </Typography>
                    </div>
                    <Button onClick={resetMatch} variant="contained">
                        Reset Match
                    </Button>
                </div>
                <img
                    src={dog.img}
                    alt="logo"
                    className="hidden lg:block m-6 w-96 h-96 rounded-full object-cover object-top"
                />
            </Paper>
        </section>
    );
};
