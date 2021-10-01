import BlogPost from "./BlogPost";

const BlogPostList = (props) => {
    const { blogPostsData, deletePost } = props;    
    return (
        <div>
            {Object.keys(blogPostsData).map((key) => <BlogPost deletePost={deletePost} date={key} title={blogPostsData[key].title} main={blogPostsData[key].main} />)}
        </div>
    );
};

export default BlogPostList;
