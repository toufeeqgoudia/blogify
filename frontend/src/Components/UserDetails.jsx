import { IoCloseCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const UserDetails = ({ post, isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {post && (
        <dialog
          open={isOpen}
          onClose={handleClose}
          className="max-w-sm max-h-80 p-5 rounded-xl shadow-3xl self-center mx-auto sm:ml-50 mt-10"
        >
          <div className="flex flex-col items-center pb-3">
            <IoCloseCircleOutline
              onClick={handleClose}
              className="self-end text-2xl cursor-pointer text-slate-300"
            />
            <div className="w-20 h-20 rounded-full border-2 border-slate-300 object-cover overflow-hidden mb-3">
              <img src={post.author.profile_img} className="w-full h-full" />
            </div>
          </div>
          <hr className="mb-3" />
          <p className="pb-3 text-lg font-medium text-center">
            {post.author.username}
          </p>
          <p className="pb-3 text-lg font-medium text-center">
            {post.author.full_name}
          </p>
          <p className="pb-3 text-lg font-medium text-center">
            {post.author.email}
          </p>
        </dialog>
      )}
    </>
  );
};

UserDetails.propTypes = {
  post: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserDetails;
