import React from "react";
import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { assets } from "../assets/greencart_assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";
const CardItems = () => {
  const {
    products,
    currency,
    axios,
    User,
    CardItems,
    updateCart,
    getCartAmount,
    removeFromCart,
    getCartItemsCount,
    navigate,
    setCardItems
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showAddress, setShowAddress] = useState(false);
  const [loading , setloading]=  useState(false);

  const getCart = () => {
    let tempArray = [];
    for (const item in CardItems) {
      const product = products.find((product) => product._id === item);
      // if (product) {
      //     tempArray.push({
      //         ...product,
      //         quantity: CardItems[item],
      //         offerPrice: product.offerPrice || product.price,
      //     });
      // }
      product.quantity = CardItems[item];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };
  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/getAddress");
      console.log("📦 GET Address Response:", data); // ✅ STEP 1: Check address data

      if (data.success) {
        console.log("📥 Addresses received:", data.address); // ✅ correct key
        console.log("📥 Is array?", Array.isArray(data.address));
        console.log("📥 Length:", data.address.length);
        setAddresses(data.address);

        if (Array.isArray(data.address) && data.address.length > 0) {
          setSelectedAddress(data.address[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    if(loading) return;
    setloading(true)
    try {
      if (!selectedAddress) {
        return toast.error("please select the address");
      }
      // for COD
      if (paymentMethod === "COD") {
         const items = cartArray.map(item => ({
        product: item._id,
        quantity: item.quantity,
      }));

      // ✅ Log here to verify
      console.log("🛒 Sending items to backend:", items);
        const { data } = await axios.post(
          "/api/order/cod",
          
            {items,  address: selectedAddress._id,})
          if(data.success){
            toast.success(data.message)
            setCardItems({})
            navigate('/my-orders')
          
          }else{
              toast.error(data.message)
          }
//for online
      }else{
 const items = cartArray.map(item => ({
        product: item._id,
        quantity: item.quantity,
      }));

      // ✅ Log here to verify
      console.log("🛒 Sending items to backend:", items);
        const { data } = await axios.post(
          "/api/order/online",
          
            {items,  address: selectedAddress._id,})
          if(data.success){
            window.location.replace(data.url)
           
          }else{
              toast.error(data.message)
          }
      }
    } catch (error) {
          toast.error(error.message)
    }
    finally {
    setloading(false); // ✅ unlock after action
  }
  };

  useEffect(() => {
    if (products.length > 0 && CardItems) {
      getCart();
    }
  }, [CardItems, products]);

  useEffect(() => {
    if (User) {
      getAddress();
    }
  }, [User]);

  return products.length > 0 && CardItems ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">{getCartItemsCount()}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCart(product._id, Number(e.target.value))
                      }
                      value={CardItems[product._id]}
                      className="outline-none"
                    >
                      {Array(
                        CardItems[product._id] > 9 ? CardItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                className="w-6 h-6"
                src={assets.remove_icon}
                alt="delete icon"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="group-hover:translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {addresses.map((address) => (
                  <p
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/Add-address")}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
        >
          {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  ) : null;
};

export default CardItems;
