import helperFunction from "../assets/helperFunctions";
import BlogPost from "./BlogPost";

const BlogPostList = (props) => {
    const { blogPostsData, deletePost, editPost, readOnly } = props;
    const { newDateObject } = helperFunction;
    return (
        <div className="max-w-2xl mx-10 md:mx-auto">
            <div className="font-bold my-8 w-full">
                <a href="https://github.com/NightShop">
                    <span>night</span>
                    <span className="text-bordo-light">Shop</span>
                </a>
                <a href="www.linkedin.com/in/boštjan-zupan-998377223">
                <span className="float-right">
                    <span className="font-thin text-gray-400">written by: </span>
                    <span className="font-thin text-bordo-light">boštjan zupan</span>
                </span>
                </a>
            </div>
            <div className="relative">
                <img
                    className="shadow-xl rounded-full w-40 mx-auto lg:absolute lg:-right-1/4 lg:-top-8"
                    src="https://i.imgur.com/HJm3AMS.png"
                    alt="profilePic"
                />
                <h1 className="text-bordo-light tracking-tight font-extralight pl-6 py-2 -ml-6 mr-20 my-16 text-4xl border-l-4 border-bordo-light">
                    scratching back corners of my brain. these are dust flakes floating midair
                </h1>
            </div>
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
