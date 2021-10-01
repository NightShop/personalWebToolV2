import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import BlogPostList from "../BlogPostList";

const BlogMain = () => {
    const db = getFirestore();
    const [blogPosts, setBlogPosts] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "blogPosts"), (snap) => {
            snap.docs.forEach((fsDoc) => {
                setBlogPosts((prevState) => ({ ...prevState, [fsDoc.id]: fsDoc.data() }));
            });
        });
        return () => unsub();
    }, [db]);

    return (
        <div>
            <h1>Welcome to the blog</h1>
            <BlogPostList blogPostsData={blogPosts} />
        </div>
    );
};

export default BlogMain;
