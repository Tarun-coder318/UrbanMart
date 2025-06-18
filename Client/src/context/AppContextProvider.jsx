import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";

 const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY

    const navigate = useNavigate();

    const [User , setUser] = useState(false);
    const [isSeller , setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [CardItems, setCardItems] = useState({});

    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    //Add to cart function

    const addToCart = (itemsID)=>{
        let cardData =  structuredClone(CardItems);
        if(cardData[itemsID]){
            cardData[itemsID] +=1;
        }else{
            cardData[itemsID] = 1;
        }
        setCardItems(cardData);
        toast.success("Item added to cart");
    }
    //update cart function
 const updateCart = (itemsID, quantity) => {
    let cardData = structuredClone(CardItems);
    cardData[itemsID] = quantity;
    setCardItems(cardData);
    toast.success("Cart updated successfully");
    }
    //remove from cart function 

const removeFromCart = (itemsID) => {
    let cardData = structuredClone(CardItems);
    if(cardData[itemsID]){
        cardData[itemsID] -= 1;
        if(cardData[itemsID] === 0 ) {
            delete cardData[itemsID];
            }
        }
            toast.success("Item removed from cart");
            setCardItems(cardData);
        }
    useEffect(() => {
        fetchProducts();
    },[]);
    const value = {navigate, User, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin,products,currency,addToCart,CardItems,setCardItems, removeFromCart,updateCart};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}
export default AppContextProvider;