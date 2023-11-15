import { useState, useEffect } from "react";
import { instance } from "../../utils/apiService";
import { useAuth } from "../../Hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

const Myblogs = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getPostData = async () => {
      const response = await instance.get(`/api/posts/`);
      setPosts(response.data);
    };

    getPostData();
  }, []);

  const userPosts = posts.filter((post) => post.author.id === user.id);

  return (
    <div className="w-3/4 h-full p-5 flex flex-col ml-25">
      <h2 className="text-lg font-semibold self-center">my blogs.</h2>
      <hr />

      <div>
        {userPosts.map((post) => (
          <div key={post.id} className="w-full flex">
            <div className="w-full h-40 p-3 my-5 overflow-hidden border-2 border-slate-200 rounded-s-md cursor-pointer">
              <div className="flex items-center my-1">
                <img
                  src={post.author.profile_img}
                  className="w-7 h-7 rounded-full border-2 border-slate-200"
                />
                <h3 className="text-lg font-bold ml-4">
                  {post.author.username}
                </h3>
              </div>
              <h4 className="text-lg font-medium">
                {post.title}
                <span className="text-xs"> - {post.date_posted}</span>
              </h4>
              <p className="text-sm">{post.content}</p>
            </div>
            <div className="w-1/12 h-40 my-5 flex flex-col justify-evenly items-center bg-slate-200 rounded-e-md">
              <FaEdit className="cursor-pointer" />
              <FaTrash className="text-red-600 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <button className="p-3 w-32 flex self-end items-center justify-evenly text-white bg-emerald-500 fixed rounded-full bottom-10 right-10 z-10">
        <IoAddCircleOutline className="text-2xl font-bold text-white" /> create.
      </button>
    </div>
  );
};

export default Myblogs;
