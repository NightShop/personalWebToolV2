import { doc, getFirestore, onSnapshot, setDoc, collection, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import BlogNewPostEditor from "./BlogNewPostEditor";
import BlogPostList from "./BlogPostList";
import WarningPopUp from "./WarningPopUp";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import helperFunction from "../assets/helperFunctions";

const BlogEditor = () => {
    const [openNewPost, setOpenNewPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState({});
    const [dataToEdit, setDataToEdit] = useState({});
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [showDeletionPopup, setShowDeletionPopup] = useState(false);
    const [postToDelete, setPostToDelete] = useState("");

    const db = getFirestore();

    const uploadBlogData = async (date, title, main, id) => {
        if (date !== "") {
            const tempId = id !== "" ? id : uniqid();
            await setDoc(doc(db, "blogPosts", tempId), {
                date,
                title,
                main,
            });
            setDataToEdit({});
            setShowWarningPopup(false);
            return;
        }
        setShowWarningPopup(true);
    };

    const deletePost = (date) => {
        setShowDeletionPopup(true);
        setPostToDelete(date);
    };

    const deletePostFinal = async (date) => {
        await deleteDoc(doc(db, "blogPosts", date));
    };

    const editPost = (id) => {
        setDataToEdit({});
        setOpenNewPost(true);
        setDataToEdit({ [id]: blogPosts[id] });
    };

    useEffect(() => {
        if (openNewPost === false) {
            setDataToEdit({});
        }
    }, [openNewPost]);

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
        <div className="w-full">
            <button className="btn-test block mx-auto" type="button" onClick={() => setOpenNewPost((prevState) => !prevState)}>New Post</button>
            {showWarningPopup && <WarningPopUp closePopup={() => setShowWarningPopup(false)} message="You have to enter a date" />}
            {showDeletionPopup
                && (
                    <DeleteConfirmationPopup
                        message={`Delete "${blogPosts[postToDelete].title}" from ${helperFunction.stringifyDate(blogPosts[postToDelete].date)}"`}
                        confirmDeletion={() => {
                            deletePostFinal(postToDelete);
                            setShowDeletionPopup(false);
                        }}
                        rejectDeletion={() => {
                            setPostToDelete("");
                            setShowDeletionPopup(false);
                        }}
                    />
                )}
            {openNewPost
                && (
                    <BlogNewPostEditor
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
