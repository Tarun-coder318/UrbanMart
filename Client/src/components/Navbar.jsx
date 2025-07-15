import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/greencart_assets/assets";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast";
// import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    User,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartItemsCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        setShowUserLogin(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);
  return (
    <nav className="flex items-center justify-between px-6 md:px-16  py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img className="w-6 h-6" src={assets.nav_cart_icon} alt="cart icon" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartItemsCount()}
          </button>
        </div>
        {!User ? (
          <div className="flex gap-3">
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/seller")}
              className="cursor-pointer px-6 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full"
            >
              Seller Login
            </button>
          </div>
        ) : (
          <div className="relative group ">
            <img src={assets.profile_icon} className="w-10" alt="profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow- border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-"
              >
                My Orders
              </li>
              <li
                onClick={() => logout()}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img className="w-6 h-6" src={assets.nav_cart_icon} alt="cart icon" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {getCartItemsCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu"></img>
        </button>
      </div>

      {/* // Mobile Menu */}

      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>
          {User && <NavLink to="/my-orders">My Orders</NavLink>}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {!User ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
