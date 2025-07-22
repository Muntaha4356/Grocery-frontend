import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {user, setUser} = useAppContext();
    const {setShowUserLogin, setSearchQuery, searchQuery} = useAppContext();

    const logout = async() => {
        setUser(null);
        navigate("/");
    }

    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate("/products")
        }
    }, [searchQuery])

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <Link to='/' onClick={()=>setOpen(false)}>
                
                <img src="https://res.cloudinary.com/dflbje6qn/image/upload/c_fill,w_50,h_50/v1752318359/Upload-Image/z6uyl8ueirmeuzgzclqd.jpg" alt="" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to='/' onClick={()=> setOpen(false)}>Home</Link>
                <Link to='/products' onClick={()=> setOpen(false)}>View Products</Link>
                
                <Link to='/contact' onClick={()=> setOpen(false)}>Contact</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                    
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">3</button>
                </div>
                {!user ? (
                    <button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src='https://res.cloudinary.com/dflbje6qn/image/upload/c_pad,w_40,h_40/v1752320359/Upload-Image/wgqesorivndcy3j0qpj3.jpg' className='rounded-full'/>
                        <ul className='hidden group  absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 rounded-md text-sm z-40 group-hover:block whitespace-nowrap'>
                            <li onClick={()=>navigate("/myorders")} className='p-1.5 pl-3 hover:bg-[var(--color-primary)] cursor-pointer'>My Orders</li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-[var(--color-primary)] cursor-pointer'>LogOut</li>
                        </ul>
                    </div>
                    
                )}
                
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <Link to='/' onClick={()=> setOpen(false)} className="block">Home</Link>
                <Link to='/products' onClick={()=> setOpen(false)} className="block">View Products</Link>
                {user && 
                    <Link to='/orders' onClick={()=> setOpen(false)} className="block">My Orders</Link>
                }
                <Link to='/contact' onClick={()=> setOpen(false)} className="block">Contact</Link>
                {!user ? (<button onClick={()=> {setOpen(false);
                     setShowUserLogin(true);
                }} className="cursor-pointer px-6 py-2 mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-[var(--color-primary-white)] rounded-full text-sm">
                    Login
                </button>) : (<button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-6 py-2 mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-[var(--color-primary-white)] rounded-full text-sm">
                    Logout
                </button>) }
                
            </div>

        </nav>
    </>
  )
}

export default Navbar
