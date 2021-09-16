import { useState } from "react";
import BlogMain from "./Blog/BlogMain";
import ToolsMain from "./ToolsMain";

const EntryNavigation = (props) => {
    const { activeSectionSetter } = props;

    return (
        <div className="entrYnavigation">
            <button type="button" onClick={() => activeSectionSetter("blog")}>Blog</button>
            <button type="button" onClick={() => activeSectionSetter("tools")}>Tools</button>
        </div>
        );
};

const App = () => {
    const [activeSection, setActiveSection] = useState("");
    const changeActiveSection = (section) => {
        setActiveSection(section);
    };

    return (
        <div>
            {activeSection === "tools" ? <ToolsMain /> : null}
            {activeSection === "blog" ? <BlogMain /> : null}
            {activeSection === "" ? <EntryNavigation activeSectionSetter={changeActiveSection} /> : null}
        </div>
    );
};

export default App;
