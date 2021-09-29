import { useEffect, useState } from "react";

const GratefulnessSingleForm = (props) => {
    const { setEntry } = props;
    const [title, setTitle] = useState("");
    const [main, setMain] = useState("");

    useEffect(() => {
        setEntry({ title, main });
    }, [title, main, setEntry]);

    return (
    <div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <textarea type="text" value={main} onChange={(e) => setMain(e.target.value)} />
    </div>
    );
};

export default GratefulnessSingleForm;
