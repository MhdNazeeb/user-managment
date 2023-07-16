import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../../../Redux/AdminAuth";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(AdminLogout());
        navigate("/");
    };

    return (
        
        
       <div>
  <div className=" ">
    <section className="relative mx-auto">
      {/* navbar */}
      <nav className="flex justify-between bg-gray-900 text-white w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full justify-between">
          <Link to="/"className="text-3xl font-bold font-heading" >
            
            DIGI SIDEKICK.
          </Link>
     
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li><Link
                to="/"className="hover:text-gray-200"> HOME</Link></li>
            <li><Link
                to="/adduser"className="hover:text-gray-200"> ADD USER</Link></li>
          </ul>
         
          <div className="hidden xl:flex items-center space-x-5">
            
            <h5 onClick={logout}>Logout</h5>
          </div>
        </div>
        {/* Responsive navbar */}
        <a className="xl:hidden flex mr-6 items-center" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="flex absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
            </span>
          </span>
        </a>
        <a className="navbar-burger self-center mr-12 xl:hidden" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </a>
      </nav>
    </section>
  </div>

  <div className="absolute bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
     
    </div>
  </div>
</div>

    );
}

export default Navbar;
