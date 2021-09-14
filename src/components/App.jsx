import { useState } from "react";
import imag from "../assets/8bitphoto_svetlo_modro.jpg";

const App = () => {
    
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>React say whattt???</h1>
            <h5>{count}</h5>
            <button onClick={() => setCount(count + 1)}>click</button>
            <img src={imag} width="250px"></img>
        </div>
    )
}

export default App