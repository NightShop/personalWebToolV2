import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignUp = (props) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const auth = getAuth();
    const createNewUser = (event) => {
        createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                const { user } = userCredential;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error: ", errorCode);
                console.log("msg: ", errorMessage);
            });
        props.setShowSignUp(false);
        event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={(event) => createNewUser(event)}>
                <h3>Sign Up</h3>
                <label>
                    email:
                    <input type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} />
                </label>
                <label>
                    password:
                    <input type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default SignUp;
