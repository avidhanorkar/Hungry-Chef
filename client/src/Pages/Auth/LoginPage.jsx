import { Utensils } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hungry-chef.onrender.com/api/auth/login",
        {
          email: user.email,
          password: user.password,
        }
      );


      if (response.status === 200) {
        console.log("Response data: ", response.data);
        
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("profilePic", JSON.stringify(response.data.user.profilePic));
        sessionStorage.setItem("address", JSON.stringify(response.data.user.address));

        setUser({ email: "", password: "" });
        navigate('/')
        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#131620] flex justify-center items-center">
      <div className="form h-[70vh] w-[30vw] bg-[#171B26] drop-shadow-2xl rounded-xl">
        <div className="flex justify-center mt-5 flex-col text-center items-center gap-5">
          <div className="h-16 w-16 bg-[#FFEDD5] flex justify-center items-center rounded-full">
            <Utensils className="h-10 w-10 text-[#DE8F25]" />
          </div>
          <div>
            <h1 className="text-white text-4xl font-semibold font-serif tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white mt-[5px]">
              Savor Every Bite – Log in to Order Your Favorite Dishes!
            </p>
          </div>
          <div className="w-full px-[30px]">
            <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-white text-[16px] text-left">
                  Email Address
                </label>
                <Input
                  type="email"
                  className="w-full"
                  placeholder="you@example.com"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[16px] text-left">
                  Password
                </label>
                <Input
                  type="password"
                  className="w-full"
                  placeholder="••••••••"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full mt-5">
                <Button
                  className="w-full text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343]"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-white">
                Don't have an account?{" "}
                <Link
                  to={"/auth/register"}
                  className="text-[#e9a343] font-semibold cursor-pointer"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
