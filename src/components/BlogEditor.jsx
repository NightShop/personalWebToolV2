import { doc, getFirestore, onSnapshot, setDoc, collection, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import BlogNewPostEditor from "./BlogNewPostEditor";
import BlogPostList from "./BlogPostList";

const BlogEditor = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState({});

    const db = getFirestore();

    const uploadBlogData = async (date, title, main) => {
        console.log({ date, title, main });
        await setDoc(doc(db, "blogPosts", date), {
            title,
            main,
        });
    };

    const deletePost = async (date) => {
        console.log("im in delete post", date);
        await deleteDoc(doc(db, "blogPosts", date));
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "blogPosts"), (snap) => {
            console.log("in useeffect");
            const tempObj = {}
            snap.docs.forEach((fsDoc) => {
                tempObj[fsDoc.id] = fsDoc.data();
            });
            setBlogPosts(tempObj);
        });
        return () => unsub();
    }, [db]);

    return (
        <div>
            <h2>Blog editor</h2>
            <button type="button" onClick={() => setOpenNewPost(!openNewPost)}>New Post</button>
            {openNewPost && <BlogNewPostEditor getBlogData={uploadBlogData} closeNewPostEditor={() => setOpenNewPost(false)} />}
            <BlogPostList blogPostsData={blogPosts} deletePost={deletePost} />
        </div>
    );
};

export default BlogEditor;
