import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { type FunctionComponent } from "react";
import { Dog } from "../../types/dog.types";
import { type Location } from "../../types/location.types";

type DogCardProps = {
    dog: Dog;
    favoriteDogs: Dog[];
    setFavoriteDogs: (value: Dog[]) => void;
    location?: Location;
};

export const DogCard: FunctionComponent<DogCardProps> = ({
    dog,
    favoriteDogs,
    setFavoriteDogs,
    location,
}) => {
    const isDogFavorited = favoriteDogs.some(
        (favoriteDog) => favoriteDog.id === dog.id
    );

    const toggleFavorite = () => {
        if (isDogFavorited) {
            setFavoriteDogs(
                favoriteDogs.filter((favoriteDog) => favoriteDog.id !== dog.id)
            );
        } else {
            setFavoriteDogs([...favoriteDogs, dog]);
        }
    };
    return (
        <Card
            className={`w-full max-w-full md:max-w-[48%] lg:min-w-[300px] lg:w-[32%] ${
                isDogFavorited ? "box-border border-1 border-[#d32f2f]" : ""
            }`}
        >
            <CardHeader title={dog.name} subheader={dog.breed} />
            <CardMedia
                component="img"
                height="230"
                width="350"
                image={dog.img}
                alt={`${dog.name} the dog`}
                className="h-[230px] max-w-full lg:max-w-[350px]"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {dog.name} is{" "}
                    {dog.age === 0
                        ? "a puppy!"
                        : dog.age === 1
                        ? `${dog.age} year old.`
                        : `${dog.age} years old.`}
                </Typography>
            </CardContent>
            <CardActions className="flex justify-between">
                <IconButton
                    aria-label="add to favorites"
                    color={isDogFavorited ? "error" : "default"}
                    onClick={toggleFavorite}
                >
                    <FavoriteIcon />
                </IconButton>
                {location && (
                    <div className="mr-2">
                        <PlaceIcon /> {location?.city}, {location?.state}
                    </div>
                )}
            </CardActions>
        </Card>
    );
};
