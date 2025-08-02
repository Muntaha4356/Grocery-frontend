import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, dummyProducts } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";
import axios from "axios"



axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;




export const AppContext = createContext();


export const AppContextProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] =useState("jj");
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState();
    const [product, setProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});
    const [cartCount, setCartCount]=useState(0);
    const [cartUpdated, setCartUpdated] = useState(false);



    //Fetch User authentication
    const fetchUserStatus = async() => {
        try {
            const {data} = await axios.get('/api/user/isAuth');
            if(data.success){
                console.log(data);
            }else{
                console.log("hhh");
                setUser(data.user)
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null)
            console.log(error)
        }
    }

    
    const fetchProducts =async () =>{
        try {
            const {data} = await axios.get("/api/product/list");
            if(data.success){
                setProduct(data.products);
            }else{
                toast.error("Error during rendering products: ", data.message)
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
        

    }
    const checkSellerAuth = async () =>{
        try {
            const {data} = await axios.get("/api/seller/is-auth");
            if(data.success){
                setIsSeller(true);
            }
            else {
                console.log("weew")
                setIsSeller(false);
            }
        } catch (error) {
            toast.error("Error verifying seller",  error);
            setIsSeller(false);
        }
    }

    const AddtoCart = (itemId) =>{
        let cartData = structuredClone(cartItems);

        
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        console.log(cartItems)
        toast.success("Added to cart");
        setCartUpdated(true);

        
    }


    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
        setCartUpdated(true);
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
        setCartUpdated(true);
    }
    useEffect(()=>{
        checkSellerAuth();
        fetchProducts();
        fetchUserStatus();
    }, [])
//update hecartitem in the database
    useEffect(() => {
        const updateCart = async () => {
            try {
                const {data} = await axios.post('/api/cart/update', {
                    cartItems
                })
                if(!data.success){
                    toast.error(data.message)
                }
                setCartItems(data.cart)
            } catch (error) {
                toast.error(error.message)
            }finally {
                setCartUpdated(false); // reset flag
            }
        }
        if(user){
            updateCart();
        }
    }, [cartUpdated])


    // Update count when cartItems change


    //get total item in cart for cart symbolin the navbar
    const getCartCount=()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
        return totalCount;
    }

    //get Cart total amount (as money)
    const getCartTotalAmount =() => {
        let totalAmount = 0;
        for(const item in cartItems ){
            let itemInfo = product.find((pr)=> pr._id ===item)
            if(cartItems[item] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[item]
            }
        }
        return Math.floor(totalAmount * 100)/100;
    }

    const getItemCount = (itemId) => {
        return cartItems[itemId]

    }


    


    





    const value= {navigate,user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, 
        product,cartItems, setCartItems ,AddtoCart, updateCartItem, removeCartItem, searchQuery,
        setSearchQuery,getCartCount, getCartTotalAmount,getItemCount, axios, checkSellerAuth, fetchProducts}

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

//A function to actually use the context.

export const useAppContext = () => {
    return useContext(AppContext);
}