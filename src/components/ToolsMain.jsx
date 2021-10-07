import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import HabitsTracker from "./HabitsTracker";
import GratefulnessDiary from "./GratefulnessDiary";
import BlogEditor from "./BlogEditor";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const ToolsMain = () => {
    const [activeSection, setActiveSection] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showSignInBar, setShowSignInBar] = useState(false);

    const auth = getAuth();
    const [user] = useAuthState(auth);

    const signInGoogleButton = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            // eslint-disable-next-line no-unused-vars
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                /* const token = credential.accessToken; */
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const emailError = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // eslint-disable-next-line no-console
                console.log("sign in google auth error:", errorCode, errorMessage, emailError, credential);
            });
    };

    useEffect(() => {
        if (user) {
            setShowSignUp(false);
            if (user.uid === "gQ7oSXs6IWXGTdBo55iMY5pvhO52") {
                setIsAdmin(true);
            }
        }
    }, [user]);

    return (
        <div className="h-full">
            <div className="mx-auto w-2/3 h-1/2 box-border">
                <img
                    className="bg-green-400 shadow-2xl p-10 w-full"
                    // eslint-disable-next-line jsx-a11y/alt-text
                    src="https://tinyurl.com/yf48em65"
                    alt="optimizer-logo"
                />
                <h2 className="font-bold text-green-400 text-xs text-center tracking-widest">
                    WELCOME,
                    {" "}
                    {user && (user.email).toUpperCase()}
                </h2>
                <button
                    className="w-24 mx-auto block mt-10 h-24 bg-rink-light font-bold"
                    type="button"
                    onClick={() => setShowSignInBar((prevState) => !prevState)}
                >
                    sign in
                </button>
                {showSignInBar
                    && (
                        <div className="flex my-2 text-black">
                            <button
                                className="btn-test border-r-4 border-l-4 px-4 border-black flex-grow"
                                type="button"
                                onClick={signInGoogleButton}
                            >
                                SIGN IN WITH GOOGLE
                            </button>
                            <button
                                className="btn-test border-r-4 border-l-4 px-4 border-black flex-grow"
                                type="button"
                                onClick={() => setShowSignUp(!showSignUp)}
                            >
                                SIGN UP WITH EMAIL
                            </button>
                            <button
                                className="btn-test border-r-4 border-l-4 px-4 border-black flex-grow"
                                type="button"
                                onClick={() => setShowSignIn(!showSignIn)}
                            >
                                SIGN IN WITH EMAIL
                            </button>
                            {user
                                && (
                                    <button
                                        className="btn-test border-r-4 border-l-4 px-4 border-black flex-grow"
                                        type="button"
                                        onClick={() => auth.signOut()}
                                    >
                                        SIGN OUT
                                    </button>
                                )}
                        </div>
                    )}
                {showSignUp && <SignUp setShowSignUp={setShowSignUp} />}
                {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
                {
                    user && (
                        <div className="h-full mt-10 -mb-6">
                            <nav className="flex p-5">
                                <button
                                    className={
                                        `flex-grow border-gray-500 
                                        bg-rink-light font-bold mx-2 border-4 p-3
                                        ${activeSection === "gratefulnessDiary" ? "bg-rink-dark" : ""}`
                                    }
                                    type="button"
                                    onClick={() => setActiveSection("gratefulnessDiary")}
                                >
                                    GRATEFULNESS
                                </button>
                                <button
                                    className={
                                        `flex-grow border-gray-500
                                        bg-rink-light font-bold mx-2
                                        border-4 p-3 
                                        ${activeSection === "habitsTracker" ? "bg-rink-dark" : ""}`
                                    }
                                    type="button"
                                    onClick={() => setActiveSection("habitsTracker")}
                                >
                                    HABITS TRACKER
                                </button>
                                {isAdmin
                                    && (
                                        <button
                                            className={
                                                `flex-grow border-gray-500 
                                                bg-rink-light font-bold mx-2 border-4
                                                p-3 ${activeSection === "blogEditor" ? "bg-rink-dark" : ""}`
                                            }
                                            type="button"
                                            onClick={() => setActiveSection("blogEditor")}
                                        >
                                            BLOG EDITOR
                                        </button>
                                    )}
                            </nav>
                            {((activeSection === "habitsTracker")) ? <HabitsTracker userId={user.uid} /> : null}
                            {((activeSection === "gratefulnessDiary")) ? <GratefulnessDiary userId={user.uid} /> : null}
                            {(activeSection === "blogEditor") ? <BlogEditor /> : null}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ToolsMain;
