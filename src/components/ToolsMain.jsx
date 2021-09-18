import { useEffect, useState } from "react";
import HabitsTracker from "./HabitsTracker";
import GratefulnessDiary from "./GratefulnessDiary";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const ToolsMain = () => {
    const [activeSection, setActiveSection] = useState("");
    const [user, setUser] = useState("");

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    return (
        <div>
            <h1>Welcome to the tools</h1>
            <h3>{user.uid}</h3>
            <button type="button" onClick={signInWithPopup}>Sign in with google</button>
            <div>
                <nav>
                    <button type="button" onClick={() => setActiveSection("gratefulnessDiary")}>Gratefulnes</button>
                    <button type="button" onClick={() => setActiveSection("habitsTracker")}>Habits Tracker</button>
                </nav>
                {(activeSection === "habitsTracker") ? <HabitsTracker /> : null}
                {(activeSection === "gratefulnessDiary") ? <GratefulnessDiary /> : null}
            </div>
        </div>
    );
};

export default ToolsMain;
