import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignIn = (props) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const { closeForm, closeProfileOptions } = props;
    const auth = getAuth();

    const createNewUser = (event) => {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                const { user } = userCredential;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error: ", errorCode);
                console.log("msg: ", errorMessage);
            });

        closeForm();
        closeProfileOptions();
        event.preventDefault();
    };

    return (
        <div className="shadow-2xl rounded-3xl border-4 z-20
        border-black max-w-min mx-auto fixed
        left-1/2 top-2/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400"
        >
            <form className="m-10 mb-2" onSubmit={(event) => createNewUser(event)}>
                <h3 className="font-bold text-lg m-4">Login</h3>
                <div>
                    <div className="m-4">
                        <label>
                            Email:
                            <input
                                className="p-1 rounded-md my-1"
                                type="email"
                                value={loginEmail}
                                onChange={(event) => setLoginEmail(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className="m-4">
                        <label>
                            Password:
                            <input
                                className="p-1
                            rounded-md my-1"
                                type="password"
                                value={loginPassword}
                                onChange={(event) => setLoginPassword(event.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-around">
                    <input className="m-4 btn-test bg-white rounded-lg hover:bg-rink-light hover:text-black" type="submit" value="Submit" />
                    <button
                        className="m-4 btn-test bg-white rounded-lg hover:bg-rink-light hover:text-black"
                        type="button"
                        onClick={closeForm}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
