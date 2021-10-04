import BlogPost from "./BlogPost";

const BlogPostList = (props) => {
    const { blogPostsData, deletePost, editPost } = props;

    return (
        <div>
            {Object.keys(blogPostsData).map((key) => (
                <BlogPost
                    key={key}
                    editPost={editPost}
                    deletePost={deletePost}
                    date={blogPostsData[key].date}
                    title={blogPostsData[key].title}
                    main={blogPostsData[key].main}
                    id={key}
                />
              ))}
        </div>
    );
};

export default BlogPostList;
