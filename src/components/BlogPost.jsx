/* eslint-disable react/no-danger */
import DOMPurify from "dompurify";
import helperFunction from "../assets/helperFunctions";

const BlogPost = (props) => {
    const { stringifyDate, parseBlogPost } = helperFunction;
    const { main, title, date, deletePost, editPost } = props;
    const cleanedMain = DOMPurify.sanitize(parseBlogPost(main));
    return (
        <div>
            <h2>{title}</h2>
            <button type="button" onClick={() => deletePost(date)}>Delete</button>
            <button type="button" onClick={() => editPost(date)}>Edit</button>
            <h5>{stringifyDate(date)}</h5>
            <div dangerouslySetInnerHTML={{ __html: cleanedMain }} />
        </div>
    );
};

export default BlogPost;
