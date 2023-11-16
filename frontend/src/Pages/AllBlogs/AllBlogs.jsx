import { useState, useEffect } from "react";
import { instance } from "../../utils/apiService";
import UserDetails from "../../Components/UserDetails";
import PostDetails from "../../Components/PostDetails";

const descStyles = {
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const AllBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [postDialog, setPostDialog] = useState(false);

  useEffect(() => {
    const getPostData = async () => {
      const response = await instance.get("/api/posts/");
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
      );
      setPosts(sortedPosts);
    };

    getPostData();
  }, []);

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

  const openUserDetailsDialog = (postId) => {
    setSelectedPostId(postId);
    setUserDialog(true);
  };

  const closeUserDetailsDialog = () => {
    setSelectedPostId(null);
    setUserDialog(false);
  };

  const openPostDetailsDialog = (postId) => {
    setSelectedPostId(postId);
    setPostDialog(true);
  };

  const closePostDetailsDialog = () => {
    setSelectedPostId(null);
    setPostDialog(false);
  };

  return (
    <div className="w-3/4 h-full p-5 flex flex-col ml-25">
      <h2 className="text-lg font-semibold self-center">all blogs.</h2>
      <hr />
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full h-45 p-3 my-5 overflow-hidden border-2 border-slate-200 rounded-md"
          >
            <div
              className="flex items-center my-1 cursor-pointer"
              onClick={() => openUserDetailsDialog(post.id)}
            >
              <img
                src={post.author.profile_img}
                className="w-7 h-7 rounded-full border-2 border-slate-200"
              />
              <h3 className="text-lg font-bold ml-4">{post.author.username}</h3>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => openPostDetailsDialog(post.id)}
            >
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
          </div>
        ))}
      </div>
      <UserDetails
        post={posts.find((post) => post.id === selectedPostId)}
        isOpen={userDialog}
        onClose={closeUserDetailsDialog}
      />
      <PostDetails
        post={posts.find((post) => post.id === selectedPostId)}
        isOpen={postDialog}
        onClose={closePostDetailsDialog}
        formatPostDate={formatPostDate}
      />
    </div>
  );
};

export default AllBlogs;
