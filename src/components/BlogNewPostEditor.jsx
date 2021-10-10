import { useEffect, useState } from "react";

const BlogNewPostEditor = (props) => {
    const { getBlogData, closeNewPostEditor, dataToEdit } = props;
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [main, setMain] = useState("");
    const [id, setId] = useState("");

    const submitPostToServer = (event) => {
        event.preventDefault();
        getBlogData(date, title, main, id);
        if (date !== "") {
            closeNewPostEditor();
        }
    };

    useEffect(() => {
        if (Object.keys(dataToEdit).length !== 0) {
            const tempId = Object.keys(dataToEdit)[0];
            setId(tempId);
            setDate(dataToEdit[tempId].date);
            setTitle(dataToEdit[tempId].title);
            setMain(dataToEdit[tempId].main);
        }
    }, [dataToEdit]);

    return (
        <div className="border-2 border-grey-400">
            <h3 className="font-semibold text-2xl">New Post</h3>
            <form className="flex-col flex" onSubmit={submitPostToServer}>
                <label className="font-medium">
                    Date:
                    <input className="border-2 m-3" type="date" value={date} onChange={(ev) => setDate(ev.target.value)} />
                </label>
                <label className="font-medium">
                    Title:
                    <input className="border-2 m-3 w-2/3" type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                </label>
                <label className="font-medium">
                    Main:
                    <br />
                    <textarea
                        className="border-2 border-rink-light w-11/12 h-60 m-4"
                        type="text"
                        value={main}
                        onChange={(ev) => setMain(ev.target.value)}
                    />
                </label>
                <input type="submit" className="btn-test w-24 block mx-auto" value="add post" />
            </form>
            <button type="button" className="btn-test block mx-auto" onClick={closeNewPostEditor}>Close</button>
        </div>
    );
};

export default BlogNewPostEditor;
