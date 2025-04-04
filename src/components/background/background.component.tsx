import { type FunctionComponent } from "react";

export const Background: FunctionComponent = () => {
    return (
        <div
            className="fixed h-screen w-screen top-0 left-0 z-[-1]"
            style={{
                backgroundImage:
                    "linear-gradient(to right bottom, #ffffff, #f5f5f5, #ebebeb, #e1e1e1, #d7d7d7)",
            }}
        ></div>
    );
};
