import { instance } from "../utils/apiService";
import PropTypes from "prop-types";

const DeletePost = ({ selectedId, isOpen, onClose }) => {
  const deletePost = async () => {
    try {
      await instance.delete(`/api/post/${selectedId}/`);
      window.location.reload();
      onClose();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {selectedId && (
        <dialog
          open={isOpen}
          onClose={handleClose}
          className="w-72 h-40 p-5 mt-14 ml-50 flex flex-col justify-evenly rounded-xl shadow-3xl"
        >
          <p className="text-lg font-bold">
            Are you sure you want to delete this post?
          </p>
          <div className="w-full flex justify-between items-center">
            <button
              className="w-2/5 px-5 font-medium py-2 rounded-lg bg-slate-300"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="w-2/5 px-5 font-medium py-2 rounded-lg bg-red-600 text-white"
              onClick={deletePost}
            >
              Delete
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

DeletePost.propTypes = {
  selectedId: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeletePost;
