import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import HabitsTracker from "./HabitsTracker";
import GratefulnessDiary from "./GratefulnessDiary";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const ToolsMain = () => {
    const [activeSection, setActiveSection] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    const auth = getAuth();
    const [user] = useAuthState(auth);

    const signInGoogleButton = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                /* const token = credential.accessToken; */
                console.log(result.user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const emailError = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("sign in google auth error:", errorCode, errorMessage, emailError, credential);
            });
    };

    useEffect(() => {
        if (user) {
            setShowSignUp(false);
        }
        console.log("user is set");
        console.log(user);
    }, [user]);

    return (
        <div>
            <h1>Welcome to the tools</h1>
            <h3>{user && user.uid}</h3>
            <button type="button" onClick={signInGoogleButton}>Sign in with google</button>
            <button type="button" onClick={() => setShowSignUp(!showSignUp)}>Sign up with email</button>
            <button type="button" onClick={() => setShowSignIn(!showSignIn)}>Sign in with email</button>
            {showSignUp && <SignUp setShowSignUp={setShowSignUp} />}
            {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
            {user && <button type="button" onClick={() => auth.signOut()}>Sign Out</button>}
            {user && (
                <div>
                    <nav>
                        <button type="button" onClick={() => setActiveSection("gratefulnessDiary")}>Gratefulnes</button>
                        <button type="button" onClick={() => setActiveSection("habitsTracker")}>Habits Tracker</button>
                    </nav>
                    {((activeSection === "habitsTracker")) ? <HabitsTracker userId={user.uid} /> : null}
                    {((activeSection === "gratefulnessDiary")) ? <GratefulnessDiary userId={user.uid} /> : null}
                </div>
            )}
        </div>
    );
};

export default ToolsMain;
