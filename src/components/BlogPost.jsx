import DOMPurify from "dompurify";

const BlogPost = (props) => {
    const { parsedMain } = props;
    const cleanedMain = DOMPurify.sanitize(parsedMain);
    console.log(JSON.stringify(cleanedMain));
    return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: cleanedMain }} />
    );
};

export default BlogPost;
