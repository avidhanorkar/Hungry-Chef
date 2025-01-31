import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="h-[80vh] bg-[#131620] flex items-center gap-10 justify-center ">
      <div className="h-full flex justify-center flex-col items-center w-[30%]">
        <div className="w-[300px] h-[300px] bg-black rounded-full">
            <img src={`${user.profilePic}`} className="w-[300px] h-[300px] rounded-full" alt="" />
        </div>
        <p className="text-center text-[25px] text-white font-semibold mt-[20px]">
            {user.name}
        </p>
      </div>
      <div className="w-[70%] rounded-xl h-full flex justify-start flex-col pt-10 px-[120px] gap-10">
        
      </div>
    </div>
  );
};

export default Profile;
