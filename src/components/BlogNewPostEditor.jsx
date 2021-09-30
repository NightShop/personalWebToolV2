import { useEffect, useState } from "react";
import helperFunction from "../assets/helperFunctions";
import BlogPost from "./BlogPost";

const BlogNewPostEditor = () => {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [main, setMain] = useState("");
    const [parsedMain, setParsedMain] = useState("");

    useEffect(() => {
        setParsedMain(helperFunction.parseBlogPost(main));
    }, [date, title, main]);

    return (
        <div>
            <h3>New Post</h3>
            <form>
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
            </form>
            <BlogPost parsedMain={parsedMain} />
        </div>
    );
};

export default BlogNewPostEditor;
