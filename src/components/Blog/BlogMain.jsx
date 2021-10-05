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
        <div className="font-custom border-t-8 border-bordo-light bg-gray-lightback">
            <BlogPostList blogPostsData={blogPosts} readOnly />
        </div>
    );
};

export default BlogMain;
