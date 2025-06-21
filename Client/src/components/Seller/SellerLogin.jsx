import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);
  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex itmes-center text-sm"
      >
        <div className=" flex flex-col gap-4 m-auto items-start p-8 py-12  sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white ">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span>Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Enter Your Email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-600"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
              type="text"
              placeholder="Enter Your passwprd"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-600"
              required
            />
          </div>
          <button className="bg-primary hover:bg-green-200 transition-all text-white w-full py-2 rounded-md cursor-pointer mt-5">
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
