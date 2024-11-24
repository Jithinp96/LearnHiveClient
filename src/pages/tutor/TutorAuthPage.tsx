import React from "react";

import TutorAuthenticationForm from "../../components/tutor/AuthPages/TutorAuthenticationForm";
import { GoogleOAuthProvider } from "@react-oauth/google";

const TutorAuthPage: React.FC = () => {
    return (
        <>
            <GoogleOAuthProvider clientId="183915678498-43rbg6rbib4ji69q2ok2oftm8eqk6a7g.apps.googleusercontent.com">
                <TutorAuthenticationForm />
            </GoogleOAuthProvider>
        </>
    )
}

export default TutorAuthPage;