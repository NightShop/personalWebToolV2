import { useState } from "react";
import { ProgressPlugin } from "webpack";
import BlogMain from "BlogMain";
import ToolsMain from "ToolsMain";

const App = () => {
    const [activeSection, setActiveSection] = useState("");

    const entryNavigation = (props) => {
        return (
            <div className="entrYnavigation">
                <button onClick={props.makeBlogActiveSection}>Blog</button>
                <button onClick={props.makeToolsActiveSection}>Tools</button>
            </div>
        );
    }

    return (
        <div>
            {}
        </div>
    );
};

export default App;
