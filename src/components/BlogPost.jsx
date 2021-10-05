/* eslint-disable react/no-danger */
import DOMPurify from "dompurify";
import helperFunction from "../assets/helperFunctions";

const BlogPost = (props) => {
    const { stringifyDate, parseBlogPost } = helperFunction;
    const { main, title, date, deletePost, editPost, id, readOnly } = props;
    const cleanedMain = DOMPurify.sanitize(parseBlogPost(main));
    console.log(cleanedMain);
    return (
        <div className="container border-4">
            <h2 className="text-2xl">{title}</h2>
            {!readOnly && <button className="btn-test" type="button" onClick={() => deletePost(id)}>Delete</button>}
            {!readOnly && <button type="button" onClick={() => editPost(id)}>Edit</button>}
            <h5 className="font-bold">{stringifyDate(date)}</h5>
            <div dangerouslySetInnerHTML={{ __html: cleanedMain }} />
        </div>
    );
};

export default BlogPost;
