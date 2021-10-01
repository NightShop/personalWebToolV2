import { useState } from "react";

const BlogNewPostEditor = (props) => {
    const { getBlogData, closeNewPostEditor } = props;

    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [main, setMain] = useState("");

    const submitPostToServer = (event) => {
        event.preventDefault();
        getBlogData(date, title, main);
        closeNewPostEditor();
    };

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
        </div>
    );
};

export default BlogNewPostEditor;
