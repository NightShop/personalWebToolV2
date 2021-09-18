const SignUp = () => {

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
    );
};

export default SignUp;
