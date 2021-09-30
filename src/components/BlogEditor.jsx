import { useState } from "react";
import BlogNewPostEditor from "./BlogNewPostEditor";

const BlogEditor = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    
    return (
        <div>
            <h2>Blog editor</h2>
            <button type="button" onClick={() => setOpenNewPost(!openNewPost)}>New Post</button>
            {openNewPost && <BlogNewPostEditor />}
        </div>
    )
};

export default BlogEditor;
