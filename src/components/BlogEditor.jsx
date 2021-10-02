import { doc, getFirestore, onSnapshot, setDoc, collection, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import BlogNewPostEditor from "./BlogNewPostEditor";
import BlogPostList from "./BlogPostList";

const BlogEditor = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState({});
    const [dataToEdit, setDataToEdit] = useState({});

    const db = getFirestore();

    const uploadBlogData = async (date, title, main) => {
        await setDoc(doc(db, "blogPosts", date), {
            title,
            main,
        });
        setDataToEdit({});
    };

    const deletePost = async (date) => {
        console.log("im in delete post", date);
        await deleteDoc(doc(db, "blogPosts", date));
    };

    const editPost = (date) => {
        setOpenNewPost(true);
        setDataToEdit({ [date]: blogPosts[date] });
    };

    const clearDataToEdit = () => {
        setDataToEdit({});
    }

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "blogPosts"), (snap) => {
            const tempObj = {};
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
            {openNewPost
                && (
                    <BlogNewPostEditor
                        clearDataToEdit={clearDataToEdit}
                        dataToEdit={dataToEdit}
                        getBlogData={uploadBlogData}
                        closeNewPostEditor={() => setOpenNewPost(false)}
                    />
                )}
            <BlogPostList blogPostsData={blogPosts} deletePost={deletePost} editPost={editPost} />
        </div>
    );
};

export default BlogEditor;
