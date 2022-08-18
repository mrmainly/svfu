import React from "react";
import "./forgot_password.css";
import { useSelector } from "react-redux";

import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import VerifyForm from "./components/VerifyForm";

const ForgotPassword = () => {
    const { email_form, password_form, verify_form } = useSelector(
        (state) => state.forgot_version_slice
    );

    return (
        <div>
            {/* <div
                style={{
                    background: "url(/img/Frame1138.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: 40,
                    width: "100%",
                }}
            /> */}
            <div className="background_style">
                {email_form && <EmailForm />}
                {password_form && <PasswordForm />}
                {verify_form && <VerifyForm />}
            </div>
        </div>
    );
};

export default ForgotPassword;
