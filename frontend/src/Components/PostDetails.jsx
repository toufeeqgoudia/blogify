import { IoCloseCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const PostDetails = ({ post, isOpen, onClose, formatPostDate }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {post && (
        <dialog
          open={isOpen}
          onClose={handleClose}
          className="w-3/5 p-5 rounded-xl shadow-3xl ml-33 mt-10"
        >
          <div className="flex items-center justify-between my-1">
            <div className="flex items-center">
              <img
                src={post.author.profile_img}
                className="w-10 h-10 rounded-full border-2 border-slate-200"
              />
              <h3 className="text-lg font-bold ml-4">{post.author.username}</h3>
            </div>
            <IoCloseCircleOutline
              className="text-2xl cursor-pointer text-slate-300"
              onClick={onClose}
            />
          </div>
          <hr className="mb-5 mt-5" />
          <div>
            <h4 className="text-lg font-medium mb-3">{post.title}</h4>
            <p className="text-xs mb-3">{formatPostDate(post.date_posted)}</p>
            <p className="text-sm">{post.content}</p>
          </div>
        </dialog>
      )}
    </>
  );
};

PostDetails.propTypes = {
  post: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formatPostDate: PropTypes.func.isRequired,
};

export default PostDetails;
