// frontend:
import { AuthContext } from "@/context/auth.context";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || ""); 
  const [address, setAddress] = useState(user?.address || "");
  const [profilePic, setProfilePic] = useState(null); 
  const [previewURL, setPreviewURL] = useState(user?.profilePic || ""); 

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(user?.profilePic || ""); // Reset preview if file removed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/updateProfile/${user.user}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        console.log("Profile updated successfully", data);
        setName(data.profile.name);
        setProfilePic(data.profile.profilePic);
        navigate(`/profile/${user.user}`);
      } else {
        const errorText = await response.text(); // Log the entire response text
        console.error("Error updating profile:", errorText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="h-[80vh] bg-[#131620] px-32 py-10">
      <p className="text-3xl text-white font-bold font-serif tracking-wider">
        Update Profile
      </p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col gap-5 px-20 py-10 bg-[#171B26] mt-10">
          <div className="flex justify-between items-end text-[20px] font-semibold">
            <p className="text-white">Name:</p>
            <input
              type="text"
              className="bg-[#131620] text-white text-right h-10 text-[25px] rounded-md font-semibold"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex justify-between items-end text-[20px] font-semibold">
            <p className="text-white">Address:</p>
            <input
              type="text"
              className="bg-[#131620] text-white text-right h-10 text-[25px] rounded-md font-semibold"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="flex justify-between items-end text-[20px] font-semibold">
            <p className="text-white">Profile Image:</p>
            <input
              type="file"
              className="bg-[#131620] rounded-md text-white text-right h-8 w-80  font-semibold"
              onChange={handleFileChange}
            />
          </div>
          {previewURL && (
            <img
              src={previewURL}
              alt="Profile Preview"
              className="mt-4 h-24 w-24 rounded-full object-cover"
            />
          )}
          <Button
            type="submit"
            className="text-sm tracking-wider uppercase py-6 font-bold text-white border-white border-2 bg-transparent hover:bg-white hover:text-black duration-200 mt-5"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
