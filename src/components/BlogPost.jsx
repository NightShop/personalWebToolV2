/* eslint-disable react/no-danger */
import DOMPurify from "dompurify";
import helperFunction from "../assets/helperFunctions";

const BlogPost = (props) => {
    const { stringifyDate, parseBlogPost } = helperFunction;
    const { main, title, date, deletePost, editPost, id } = props;
    const cleanedMain = DOMPurify.sanitize(parseBlogPost(main));
    return (
        <div className="container">
            <h2>{title}</h2>
            <button className="btn-test" type="button" onClick={() => deletePost(id)}>Delete</button>
            <button type="button" onClick={() => editPost(id)}>Edit</button>
            <h5>{stringifyDate(date)}</h5>
            <div dangerouslySetInnerHTML={{ __html: cleanedMain }} />
        </div>
    );
};

export default BlogPost;
