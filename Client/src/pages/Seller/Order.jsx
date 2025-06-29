import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import { assets } from "../../assets/greencart_assets/assets";
import toast from "react-hot-toast";

const Order = () => {
  const { currency, axios, checkIsseller } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchorder = async () => {
    try {
      const { data } = await axios.get("/api/order/getSellerOrder");
      console.log("order data:", data);

      if (data.success) {
        toast.success(data.message);
        setOrders(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchorder();
  },[]);

  return (
    <div className="no-scrollbar  flex-1 h-[95vh] overflow-y-scroll flex flex-col">
      <div className="md:p-10 p-4 space-y-4 max-w-3xl">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col  md:items-center md:flex-row gap-5  justify-between p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover "
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-green-400">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className=" text-sm md:text-base text-black/60">
              <p className="font-medium text-black/80 mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{" "}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode},{" "}
                {order.address.country}
                <p>{order.address.phone}</p>
              </p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">
              {currency}
              {order.amount}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
