import helperFunction from "../assets/helperFunctions";
import BlogPost from "./BlogPost";


const BlogPostList = (props) => {
    const { blogPostsData, deletePost, editPost, readOnly } = props;
    const { newDateObject } = helperFunction;
    return (
        <div>
            {Object.keys(blogPostsData)
            .sort((a, b) => newDateObject(blogPostsData[b].date) - newDateObject(blogPostsData[a].date))
            .map((key) => (
                <BlogPost
                    key={key}
                    editPost={editPost}
                    deletePost={deletePost}
                    date={blogPostsData[key].date}
                    title={blogPostsData[key].title}
                    main={blogPostsData[key].main}
                    id={key}
                    readOnly={readOnly}
                />
              ))}
        </div>
    );
};

export default BlogPostList;
