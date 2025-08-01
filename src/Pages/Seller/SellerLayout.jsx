import React from 'react'
import { useAppContext } from '../../Context/AppContext';
import { assets } from '../../assets/greencart_assets/assets';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
//navigation bar and sidebar
const SellerLayout = () => {
    const navigate = useNavigate();
    const {isSeller, setIsSeller, axios} =useAppContext();
    //adding icon images
    

    

    

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout =async()=>{

        try {
            await axios.post("/api/seller/logout");
            setIsSeller(false);
            toast.success("Seller logged out");
            navigate("/"); // redirect if needed
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed");
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
                <Link to="/">
                    <img className="cursor-pointer w-34 md:w-38" 
                    src={assets.logo} alt="dummyLogoColored" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
                {sidebarLinks.map((item, index) => (
                    <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-indigo-500"
                                : "hover:bg-gray-100/90 border-white "
                            }`
                        }
                    >
                        <img src={item.icon} alt="" className='w-7 h-7' />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            {/* for displaying child components */}
            <Outlet/>
            </div>
            
        </>
    );
}

export default SellerLayout
