import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { dummyOrders } from "../assets/greencart_assets/assets";

const MyOrders = () => {
  const [order, setOrder] = useState([]);
  const { currency } = useAppContext();

  const fetchorder = async () => {
    setOrder(dummyOrders);
  };

  useEffect(() => {
    fetchorder();
  }, []);

  return ( 
    <div className="mt-10 pb-10">
      <div className=" flex flex-col items-end  w-max mb-8 ">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16  h-0.5 bg-green-500 rounded-full "></div>
      </div>
      {order.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-5 p-4 py-2  max-w-3xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>OrderId :{order._id}</span>
            <span>payment :{order.paymentType}</span>
            <span>Total Amount :{order.amount}</span>
          </p>
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white text-gray-500/70 ${
                order.items.length !== index + 1 && "border-b"
              } border-gray-300 flex flex-col md:flex-row md:items-center justify-between pl-9 py-5 md:gap-6 `}
            >
              <div className=" flex items-center mb-4 md:mb-0 ">
                <div className="bg-green-300 p-4 rounded-lg ">
                  <img
                    src={item.product.image[0]}
                    alt=""
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4">
                  <h2 className=" text-xl font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p> category:{item.product.category}</p>
                </div>
              </div>
              <div className="text-gray-300 text-lg font-medium ">
                <p>Quantity:{item.quantity || "1"}</p>
                <p>Status:{item.status}</p>
                <p>Date:{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-green-300 text-lg font-medium">
                Amount:{currency}
                {item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
