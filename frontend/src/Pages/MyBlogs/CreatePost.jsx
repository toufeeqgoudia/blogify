import { useState } from "react";
import { instance } from "../../utils/apiService";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: user,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await instance.post(
        "/api/posts/",
        {
          title: formData.title,
          content: formData.content,
          author: formData.author,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      navigate("/myblogs");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-full h-full p-5 flex flex-col mt-16 sm:w-3/4 sm:ml-25 sm:mt-0">
      <h3 className="text-lg font-medium self-center">create post.</h3>
      <hr />
      <form className="flex flex-col mt-3" onSubmit={handleCreate}>
        <p className="font-medium mb-1">title.</p>
        <input
          name="title"
          className="w-full border-2 outline-none py-1 px-2 mb-2 rounded-lg"
          onChange={handleChange}
        />
        <p className="font-medium mb-1">content.</p>
        <textarea
          name="content"
          className="w-full min-h-full border-2 outline-none py-1 px-2 mb-2 rounded-lg"
          onChange={handleChange}
        />
        <div className="flex items-center justify-end my-3">
          <p
            className="w-28 text-center cursor-pointer mx-5 font-medium py-2 rounded-lg bg-slate-300"
            onClick={() => navigate(-1)}
          >
            Cancel
          </p>
          <button
            className="w-28 font-medium py-2 rounded-lg bg-black text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
