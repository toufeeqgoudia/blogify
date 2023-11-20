import { useState, useEffect } from "react";
import { instance } from "../../utils/apiService";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import DeletePost from "../../Components/DeletePost";

const descStyles = {
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const Myblogs = () => {
  const [posts, setPosts] = useState([]);
  const [delId, setDelId] = useState(null);
  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
  is used to fetch the data for the posts from the API and update the state variable `posts` with
  the fetched data. */
  useEffect(() => {
    const getPostData = async () => {
      const token = localStorage.getItem("token");
      const response = await instance.get(`/api/posts/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
      );
      setPosts(sortedPosts);
    };

    getPostData();
  }, []);

  /* The line `const userPosts = posts.filter((post) => post.author.id === user.id);` is filtering the
  `posts` array to only include posts where the `author.id` matches the `user.id`. It is essentially
  creating a new array called `userPosts` that contains only the posts authored by the current user. */
  const userPosts = posts.filter((post) => post.author.id === user.id);

  /**
   * The function `formatPostDate` takes a date string as input and returns a formatted date and time
   * string in the format "dd/mm/yyyy hh:mm:ss".
   * @returns The function `formatPostDate` returns a formatted date string without the comma between
   * the date and time.
   */
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

  /**
   * The function `openDelDialog` sets the selected post ID and opens the delete dialog.
   */
  const openDelDialog = (postId) => {
    setDelId(postId);
    setDelDialog(true);
  };

  /**
   * The `closeDelDialog` function sets the selectedId to null and closes the delete dialog.
   */
  const closeDelDialog = () => {
    setDelId(null);
    setDelDialog(false);
  };

  const openEditPost = (postId) => {
    navigate(`/myblogs/edit/${postId}`, { state: postId });
  };

  return (
    <>
      <div className="w-full h-full p-5 flex flex-col mt-16 sm:w-3/4 sm:ml-25 sm:mt-0">
        <h2 className="text-lg font-semibold self-center">my blogs.</h2>
        <hr />

        <div>
          {userPosts.map((post) => (
            <div key={post.id} className="w-full flex">
              <div className="w-full h-45 p-3 my-5 overflow-hidden border-2 border-slate-200 rounded-s-md">
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
                  <span className="text-xs">
                    {" "}
                    - {formatPostDate(post.date_posted)}
                  </span>
                </h4>
                <p className="text-sm" style={descStyles}>
                  {post.content}
                </p>
              </div>
              <div className="w-1/12 h-45 my-5 flex flex-col justify-evenly items-center bg-slate-200 rounded-e-md">
                <FaEdit
                  className="cursor-pointer"
                  onClick={() => openEditPost(post.id)}
                />
                <FaTrash
                  className="text-red-600 cursor-pointer"
                  onClick={() => openDelDialog(post.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="p-3 w-32 flex self-end items-center justify-evenly text-white bg-emerald-500 fixed rounded-full bottom-10 right-10 z-10"
          onClick={() => navigate("/myblogs/create")}
        >
          <IoAddCircleOutline className="text-2xl font-bold text-white" />{" "}
          create.
        </button>
      </div>
      <DeletePost
        selectedId={delId}
        isOpen={delDialog}
        onClose={closeDelDialog}
      />
    </>
  );
};

export default Myblogs;
