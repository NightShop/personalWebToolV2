import { render } from "react-dom";
import App from "./components/App";
import "./styles/index.css";

console.log("tesssat");

const array = [1,2,3,4]
const spreadTest = [...array, 5, 6, 7];

const objectone = {
    "neki": 5,
    "beni": 3,
    "kaj": 4
}

const objectTwo = {
    ...objectone,
    "beni": 10,
    "novo": 20
}

console.log(objectTwo)

render(
    <App/>,
document.getElementById("root"));