import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../utils/apiService";
import { HiArrowNarrowLeft } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_BASE_URL;

const PostDetails = () => {
  const [post, setPost] = useState();
  const location = useLocation();
  const postId = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await instance.get(`/api/post/${postId}/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setPost(response.data);
      } catch (error) {
        console.log("Error fetching post", error);
      }
    };

    fetchPost();
  }, [postId]);

  const formatPostDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
    return formattedDate.replace(",", ""); // Remove the comma between date and time
  };

  return (
    <>
      {post && (
        <div className="w-full h-full p-5 flex flex-col mt-16 sm:w-3/4 sm:ml-25 sm:mt-0">
          <div className="self-start w-full flex items-center mb-4 sm:w-3/5 sm:justify-between">
            <HiArrowNarrowLeft
              className="text-2xl cursor-pointer text-slate-300 mr-10"
              onClick={() => navigate(-1)}
            />
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border-2 border-slate-300 object-cover overflow-hidden">
                <img
                  src={`${baseUrl}${post.author.profile_img}`}
                  alt="Profile Photo"
                  className="w-full h-full"
                  name="profile_img"
                />
              </div>
              <h3 className="text-lg font-bold ml-4">{post.author.username}</h3>
            </div>
          </div>
          <hr />
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-3">{post.title}</h4>
            <p className="text-xs mb-3">{formatPostDate(post.date_posted)}</p>
            <p className="text-sm">{post.content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
