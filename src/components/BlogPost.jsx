/* eslint-disable react/no-danger */
import DOMPurify from "dompurify";
import helperFunction from "../assets/helperFunctions";

const BlogPost = (props) => {
    const { parseDate, parseBlogPost } = helperFunction;
    const { main, title, date, deletePost } = props;
    const cleanedMain = DOMPurify.sanitize(parseBlogPost(main));
    console.log(JSON.stringify(cleanedMain));
    return (
        <div>
            <h2>{title}</h2>
            <button type="button" onClick={() => deletePost(date)}>Delete</button>
            <h5>{parseDate(date)}</h5>
            <div dangerouslySetInnerHTML={{ __html: cleanedMain }} />
        </div>
    );
};

export default BlogPost;
