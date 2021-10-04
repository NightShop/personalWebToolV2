import { useEffect, useState } from "react";
import helperFunction from "../assets/helperFunctions";

const BlogNewPostEditor = (props) => {
    const { getBlogData, closeNewPostEditor, dataToEdit } = props;

    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [main, setMain] = useState("");
    const [id, setId] = useState("");

    const submitPostToServer = (event) => {
        event.preventDefault();
        getBlogData(date, title, main, id);
        closeNewPostEditor();
    };

    useEffect(() => {
        console.log("useeffect");
        if (Object.keys(dataToEdit).length !== 0) {
            const tempId = Object.keys(dataToEdit)[0];
            setId(tempId);
            setDate(helperFunction.parseDate(dataToEdit[tempId].date));
            setTitle(dataToEdit[tempId].title);
            setMain(dataToEdit[tempId].main);
        }
    }, [dataToEdit]);

    return (
        <div>
            <h3>New Post</h3>
            <form onSubmit={submitPostToServer}>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(ev) => setDate(ev.target.value)} />
                </label>
                <label>
                    Title
                    <input type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                </label>
                <label>
                    Main
                    <textarea type="text" value={main} onChange={(ev) => setMain(ev.target.value)} />
                </label>
                <input type="submit" value="add post" />
            </form>
            <button type="button" onClick={closeNewPostEditor}>Close</button>
        </div>
    );
};

export default BlogNewPostEditor;
