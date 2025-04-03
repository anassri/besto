import { Card, Skeleton } from "@mui/material";
import { type FunctionComponent } from "react";

export const DogCardSkeleton: FunctionComponent = () => {
    return new Array(9).fill({}).map((_value, idx) => (
        <Card
            className="flex flex-col gap-y-4 py-4 w-full md:max-w-[48%] lg:min-w-[300px] lg:w-[32%]"
            key={idx}
        >
            <div className="px-4 flex flex-col gap-y-3">
                <Skeleton variant="rounded" width={150} height={30} />
                <Skeleton variant="rounded" width={150} height={14} />
            </div>
            <Skeleton variant="rectangular" height={230} />

            <div className="px-4">
                <Skeleton variant="rounded" width={318} height={20} />
            </div>
            <div className="px-4 flex justify-between items-center">
                <Skeleton variant="rounded" width={40} height={40} />
                <Skeleton variant="rounded" width={80} height={20} />
            </div>
        </Card>
    ));
};
