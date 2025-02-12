import { Utensils } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://hungry-chef.onrender.com/api/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      if (response.status === 200) {
        console.log(response.data);
        alert("User created successfully");
        setUser({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user",
        })
        window.location.reload();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#131620] flex justify-center items-center">
      <div className="form h-auto w-[30vw] bg-[#171B26] drop-shadow-2xl rounded-xl p-6">
        <div className="flex justify-center flex-col text-center items-center gap-4">
          <div className="h-16 w-16 bg-[#FFEDD5] flex justify-center items-center rounded-full">
            <Utensils className="h-10 w-10 text-[#DE8F25]" />
          </div>
          <div>
            <h1 className="text-white text-4xl font-semibold font-serif tracking-tight">
              Welcome
            </h1>
            <p className="text-white mt-[5px]">
              Join Hungry Chef – Sign Up & Satisfy Your Cravings Today!
            </p>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-white text-[16px] text-left">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[16px] text-left">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[16px] text-left">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[16px] text-left">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-[16px] text-left" htmlFor="role">
                  Select Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="w-full mt-5">
                <Button
                  type="submit"
                  className="w-full text-sm tracking-wider uppercase px-12 py-3 bg-primary hover:bg-[#DE8F25] bg-[#e9a343]"
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-white">
                Already have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="text-[#e9a343] font-semibold cursor-pointer"
                >
                  Login Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
