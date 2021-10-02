import BlogPost from "./BlogPost";

const BlogPostList = (props) => {
    const { blogPostsData, deletePost, editPost } = props;

    return (
        <div>
            {Object.keys(blogPostsData).map((key) => (
                <BlogPost
                    editPost={editPost}
                    deletePost={deletePost}
                    date={key}
                    title={blogPostsData[key].title}
                    main={blogPostsData[key].main}
                />
              ))}
        </div>
    );
};

export default BlogPostList;
