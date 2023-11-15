import { useState, useEffect } from "react";
import { instance } from "../../utils/apiService";

const AllBlogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const response = await instance.get("/api/posts/");

      setPosts(response.data);
    };

    getPostData();
  }, []);

  return (
    <div className="w-3/4 h-full p-5 flex flex-col ml-25">
      <h2 className="text-lg font-semibold self-center">all blogs.</h2>
      <hr />
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full h-40 p-3 my-5 overflow-hidden border-2 border-slate-200 rounded-md cursor-pointer"
          >
            <div className="flex items-center my-1">
              <img src={post.author.profile_img} className="w-7 h-7 rounded-full border-2 border-slate-200" />
              <h3 className="text-lg font-bold ml-4">{post.author.username}</h3>
            </div>
            <h4 className="text-lg font-medium">{post.title}<span className="text-xs"> - {post.date_posted}</span></h4>
            <p className="text-sm">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
