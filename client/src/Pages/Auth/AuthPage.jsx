import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../Components/ui/tabs.jsx";
import LoginPage from "./LoginPage.jsx";
import Register from "./Register.jsx";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // Use string values

  return (
    <div className="w-[100vw] bg-[#131620] flex justify-center py-[50px]">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-md bg-[#131620]"
      >
        <TabsList className="bg-[#171B26] w-full">
          <TabsTrigger className="data-[state=active]:bg-[#DE8F25] data-[state=active]:text-white w-1/2" value="login">Login</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-[#DE8F25] data-[state=active]:text-white w-1/2" value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginPage />
        </TabsContent>
        <TabsContent value="signup">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
