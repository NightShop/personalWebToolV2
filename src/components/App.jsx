import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const App = () => {
    const [activeSection, setActiveSection] = useState("");
    const changeActiveSection = (section) => {
        setActiveSection(section);
    };
    const testOne = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    testOne();


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
        <div className="entrYnavigation">
            <button type="button" onClick={() => activeSectionSetter("blog")}>Blog</button>
            <button type="button" onClick={() => activeSectionSetter("tools")}>Tools</button>
        </div>
    );
};

export default App;
