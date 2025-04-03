import { type FunctionComponent } from "react";
import { LoginPageContent } from "../components/login-page-content/login-page-content.component";
import { GeneralErrorProps } from "../types/general.types";

const Login: FunctionComponent<GeneralErrorProps> = ({ setErrorMessages }) => {
    return <LoginPageContent setErrorMessages={setErrorMessages} />;
};

export default Login;
