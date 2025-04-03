import { Typography } from "@mui/material";
import type { FunctionComponent } from "react";
import logo from "../../assets/logo.png";

type LogoProps = {
    shouldScaleDown?: boolean;
};

export const Logo: FunctionComponent<LogoProps> = ({ shouldScaleDown }) => {
    return (
        <div
            className={`flex flex-row md:flex-col items-center ${
                shouldScaleDown ? "" : "mt-8"
            } ml-4 md:ml-0`}
            style={{ transition: "all 0.3s" }}
        >
            <img
                src={logo}
                alt="logo"
                className={`${
                    shouldScaleDown ? "w-12 h-12" : "w-24 h-24"
                } lg:w-32 lg:h-32`}
                style={{ transition: "all 0.3s" }}
            />
            <Typography
                variant="h1"
                fontWeight={700}
                fontSize={shouldScaleDown ? 32 : 44}
                fontFamily={"Roboto"}
                color="primary"
                style={{ transition: "all 0.3s" }}
            >
                Besto
            </Typography>
            <Typography
                variant="h5"
                color="textDisabled"
                className="hidden lg:block"
            >
                Let's find your best friend!
            </Typography>
        </div>
    );
};
