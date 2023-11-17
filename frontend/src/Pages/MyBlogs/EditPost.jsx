import { useState, useEffect } from "react";
import { instance } from "../../utils/apiService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const location = useLocation();
  const postId = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await instance.get(`/api/post/${postId}/`);
        setPost(response.data);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title: editTitle,
      content: editContent,
    };

    try {
      await instance.put(`/api/post/${post.id}/`, updatedPost, {
        headers: { "Content-Type": "application/json" },
      });

      navigate("/myblogs");
    } catch (error) {
      console.log("Error editing post: ", error);
    }
  };

  return (
    <>
      {post && (
        <div className="w-3/4 h-full p-5 flex flex-col ml-25">
          <div className="flex justify-center mb-2">
            <h3 className="text-lg font-medium">edit post.</h3>
          </div>
          <hr />
          <form className="flex flex-col mt-3" onSubmit={handleEdit}>
            <p className="font-medium mb-1">title.</p>
            <input
              name="title"
              className="w-full border-2 outline-none py-1 px-2 mb-2 rounded-lg"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <p className="font-medium mb-1">content.</p>
            <textarea
              name="content"
              className="w-full max-h-full border-2 outline-none py-1 px-2 mb-2 rounded-lg"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex items-center justify-end my-3">
              <button
                className="w-28 px-5 font-medium py-2 rounded-lg bg-black text-white"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPost;
