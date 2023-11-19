import { instance } from "./apiService";

const token = localStorage.getItem("token");

export const updateDetails = async (id, data) => {

  try {
    await instance.put(`/api/user/update/${id}/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    window.location.reload()
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateImage = async (id, data) => {
    try {
        const formData = new FormData();
    
        if (data.profile_img) {
          formData.append('profile_img', data.profile_img);
        }
    
        await instance.put(`/api/user/update/${id}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        window.location.reload()
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
}