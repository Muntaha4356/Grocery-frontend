import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, dummyProducts } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";
export const AppContext = createContext();


export const AppContextProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] =useState("jj");
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [product, setProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});
    
    const fetchProducts =async () =>{
        const fetchedProduct= dummyProducts;
        await setProduct(fetchedProduct);
        
    }

    const AddtoCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");

        
    }


    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    }

    //remove product entirely 
    const removeCartItem = (itemId) =>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId]===0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed the Item from the Cart");
        setCartItems(cartData);
    }
    useEffect(()=>{
        fetchProducts();
    }, [])


    const value= {navigate,user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, product,cartItems, AddtoCart, updateCartItem, removeCartItem, searchQuery, setSearchQuery}

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

//A function to actually use the context.

export const useAppContext = () => {
    return useContext(AppContext);
}