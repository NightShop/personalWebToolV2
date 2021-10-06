import { useState } from "react";
import { initializeApp } from "firebase/app";

import BlogMain from "./Blog/BlogMain";
import ToolsMain from "./ToolsMain";

const firebaseConfig = {

  apiKey: "AIzaSyDkxaD-NWd7TLlAaXksreK6vYmUmsTmBHs",

  authDomain: "optimized-b2358.firebaseapp.com",

  projectId: "optimized-b2358",

  storageBucket: "optimized-b2358.appspot.com",

  messagingSenderId: "740880946674",

  appId: "1:740880946674:web:5c58f690fd6907ccf4876b",

};

initializeApp(firebaseConfig);

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

const EntryNavigation = (props) => {
    const { activeSectionSetter } = props;

    return (
        <div className="flex">
            <button className="hover:bg-bordo-dark hover:text-gray-400 text-white tracking-widest text-6xl font-medium w-1/2 h-screen bg-bordo-light" type="button" onClick={() => activeSectionSetter("blog")}>Blog</button>
            <button className="hover:bg-gray-200 hover:text-gray-400 tracking-widest text-6xl font-medium w-1/2 h-screen" type="button" onClick={() => activeSectionSetter("tools")}>Tools</button>
        </div>
    );
};

export default App;
