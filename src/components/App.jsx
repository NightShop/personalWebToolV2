import { useState } from "react";
import Test from "./Test";
import imag from "../assets/8bitphoto_svetlo_modro.jpg";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1 className="j">React say what???</h1>
            <h3>Halo</h3>
            <Test />
            <h5>{count}</h5>
            <button type="button" onClick={() => setCount(count + 1)}>click</button>
            <img src={imag} alt="test" width="250px" />
        </div>
    );
};

export default App;
