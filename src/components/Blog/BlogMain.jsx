import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import BlogPostList from "../BlogPostList";

const BlogMain = (props) => {
    const db = getFirestore();
    const [blogPosts, setBlogPosts] = useState({});
    const { back } = props;

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
            <button type="button" className="block bg-bordo-light py-2 px-5 text-white rounded-full my-5 mx-auto" onClick={back}>Back</button>
        </div>
    );
};

export default BlogMain;
