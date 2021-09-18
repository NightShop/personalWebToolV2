import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const SignUp = (props) => {
    const { setUser } = props;
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [localUser, setLocalUser] = useState("");

    const auth = getAuth();

    const createNewUser = (e) => {
        createUserWithEmailAndPassword(auth, loginEmail, loginPassword).then((userCredential) => {
            const user = userCredential.user;
            setLocalUser(user);
            console.log("User created: ", user);
        })
            .catch((error) => {
                const errorCode = error.Code;
                const errorMessage = error.message;
                console.log("Error code:", errorCode);
                console.log("Error Message", errorMessage);
            });
        e.preventDefault();
    };
    useEffect(() => {
        onAuthStateChanged(auth, (userr) => {
            if (userr) {
                console.log("user id", userr.id);
                setUser(userr);
            }
        });
    }, [localUser]);

    return (
        <div>
            <form onSubmit={createNewUser}>
                <h3>Login</h3>
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
    )
}

export default SignUp;
