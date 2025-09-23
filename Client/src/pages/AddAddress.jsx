import React, { useState } from "react";
import { assets } from "../assets/greencart_assets/assets";
// import { use } from "react";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast"
import { useEffect } from "react";

//Input Field Component
const InputField = ({ type, placeholder, name, onChange, address }) => (
  <input className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-green-400 transition"
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    name={name}
    value={address[name]}
    required
/>
);

const AddAddress = () => {
  const {axios,User,navigate}= useAppContext();


  const [address, setAddresses] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddresses((preAddress) => ({
      ...preAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
      if (!User || !User._id) {
    toast.error("User info is missing. Cannot add address.");

    return;
  }
    try {
      const {data}= await axios.post('/api/address/addAddress',{address,  userId: User?._id })
      
      if(data.success){
        toast.success(data.message)
        navigate('/cart')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(()=>{
if(User===null){
  navigate('/cart')
}
  },[User,navigate])
  return (
    <div className="mt -16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping{" "}
        <span className="font-semibold text-green-400">Address</span>
      </p>
      <div className=" flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className=" flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className=" space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
               onChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="first Name"
              />
              <InputField
               onChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
             <InputField
               onChange={handleChange}
                address={address}
                name="email"
                type="text"
                placeholder="email address"
              />
               <InputField
               onChange={handleChange}
                address={address}
                name="street"
                type="text"
                placeholder="Street"
              />
               <div className="grid grid-cols-2 gap-4">
              <InputField
                onChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
               onChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
             <div className="grid grid-cols-2 gap-4">
              <InputField
                onChange={handleChange}
                address={address}
                name="zipcode"
                type="text"
                placeholder="ZipCode"
              />
              <InputField
                onChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>
                <InputField
                onChange={handleChange}
                address={address}
                name="phone"
                type="text"
                placeholder="phone"
              />
              <button className="w-full mt-6 bg-green-400 text-white py-3 hover:bg-green-500 transition cursor-pointer">Save Address</button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt=" add address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
