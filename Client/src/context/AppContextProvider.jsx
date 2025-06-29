import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_CONNECTION;
// ✅ Debug logs
console.log("🔗 Backend URL:", import.meta.env.VITE_BACKEND_CONNECTION);
console.log("📦 Axios baseURL:", axios.defaults.baseURL);

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();

  const [User, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [CardItems, setCardItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // pageReload After login
  const checkIsseller = async () => {
    try {
      const { data } = await axios.post("/api/seller/is-Sellerauth");
      if (data.success) {
        setIsSeller(true);
      } else {
        toast.error(data.message);
        setIsSeller(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsSeller(false);
    }
  };
  const checkIsUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      console.log("🧪 Auth check response:", data);
      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        setCardItems(data.user.cardItems)
      
      } else {
        setUser(false);
         if (!window.location.pathname.startsWith("/seller")) {
    setShowUserLogin(true);  // ✅ Safe to show user form
  } else {
    setShowUserLogin(false); // ✅ Don't show user form on seller pages
  }
      }
    } catch (error) {
      console.log("Auth check failed:", error.message);
      setUser(false);
      setShowUserLogin(true);
    }
  };

  const fetchSellerProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        if (data.message !== "Not Authorized") {
        toast.error(data.message);
      }
      }
    } catch (error) {
     if (error.response?.status !== 401) {
      toast.error(error.message || "Something went wrong");
    }
    }
  };
   
  const fetchPublicProducts = async () => {
  try {
    const { data } = await axios.get("/api/product/public"); // 🌐 Public
    if (data.success) {
      setProducts(data.products);
      
    } else {
    
        toast.error(data.message);
      
    }
  } catch (error) {
           toast.error(error.message || "Something went wrong");
  
  }
};


  //Add to cart function

  const addToCart = (itemsID) => {
    let cardData = structuredClone(CardItems);
    if (cardData[itemsID]) {
      cardData[itemsID] += 1;
    } else {
      cardData[itemsID] = 1;
    }
    setCardItems(cardData);
    toast.success("Item added to cart");
  };
  //update cart function
  const updateCart = (itemsID, quantity) => {
    let cardData = structuredClone(CardItems);
    cardData[itemsID] = quantity;
    setCardItems(cardData);
    toast.success("Cart updated successfully");
  };
  //remove from cart function

  const removeFromCart = (itemsID) => {
    let cardData = structuredClone(CardItems);
    if (cardData[itemsID]) {
      cardData[itemsID] -= 1;
      if (cardData[itemsID] === 0) {
        delete cardData[itemsID];
      }
    }
    toast.success("Item removed from cart");
    setCardItems(cardData);
  };

  const getCartItemsCount = () => {
    // return Object.values(CardItems).reduce((total, quantity) => total + quantity, 0);
    let totalCount = 0;
    for (const item in CardItems) {
      totalCount += CardItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in CardItems) {
      const product = products.find((product) => product._id === item);
      if (CardItems[item] && product) {
        totalAmount += product.offerPrice * CardItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
   
    checkIsseller();
    checkIsUser();
    fetchPublicProducts();
  }, []);
  useEffect(() => {
  if (isSeller) {
    fetchSellerProducts(); // ✅ Now it's safe to fetch seller products
  }
}, [isSeller]);


useEffect(()=>{
const updateCart = async () => {
  try {
     if (Object.keys(CardItems).length === 0) return;
    const {data}= await axios.post('/api/cart/cartupdate',{ cardItems: CardItems,});
    if(!data.success){
toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
if(User){
  updateCart();
}
},[CardItems,User])
  const value = {
    navigate,
    User,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    CardItems,
    setCardItems,
    removeFromCart,
    updateCart,
    searchQuery,
    setSearchQuery,
    getCartItemsCount,
    getCartAmount,
    axios,
    fetchSellerProducts,
    fetchPublicProducts
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
