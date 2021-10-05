/* eslint-disable react/no-danger */
import DOMPurify from "dompurify";
import helperFunction from "../assets/helperFunctions";

const BlogPost = (props) => {
    const { stringifyDate, parseBlogPost } = helperFunction;
    const { main, title, date, deletePost, editPost, id, readOnly } = props;
    const cleanedMain = DOMPurify.sanitize(parseBlogPost(main));
    return (
        <div className="mb-12">
            <h5 className="text-gray-400">{stringifyDate(date)}</h5>
            <h2 className="text-5xl font-medium my-4">{title}</h2>
            {!readOnly && <button className="btn-test" type="button" onClick={() => deletePost(id)}>Delete</button>}
            {!readOnly && <button type="button" onClick={() => editPost(id)}>Edit</button>}
            <div dangerouslySetInnerHTML={{ __html: cleanedMain }} />
        </div>
    );
};

export default BlogPost;
