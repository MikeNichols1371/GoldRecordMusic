import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { logo } from '../assets/constants';
import { links } from '../assets/constants';

const NavLinks = ( { handleClick } ) => (
  <div className = "mt-10">
    { links.map((link) => (          // map through links array
    <NavLink 
      key = { link.name }
      to = { link.to }
      className = "flex flex-row justify-start items-center my-8 text-md font-medium text-white hover:text-gray-400"
      onClick = { () => handleClick && handleClick() }>
      <link.icon className = "w-6 h-6 mr-4" />
      { link.name }                 { /* display name of each link */ }
    </NavLink> 
    ) ) }
  </div>
)

  

const Sidebar = () => { 
  const [ mobileMenu, setMobileMenu ] = useState(false); // default state for if mobile menu is open  is false

  return (
    <> { /* <> is a shorthand for <React.Fragment> more info  at https://reactjs.org/docs/fragments.html */ }
    { /* Mobile menu for larger devices */ }
    <div className = "md:flex hidden flex-col w-[240px] px-6 py-10" 
    style = { { background: 'linear-gradient(57deg, rgba(172,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(172,0,0,1) 100%)' } }> { /* sidebar background gradient */ }
      <img src =  { logo } alt = "logo" className = "w-full h-[220px] object-contain pr-2" /> { /* logo */ }
      <NavLinks />
    </div>
    { /* Mobile menu open and close icons for smaller devices */ }
    <div className = "absolute md:hidden block top-6 right-3">
    { /*  Ternary operator if mobileMenu is true ( open ), display close icon, else display menu icon */ }
      { mobileMenu ? <RiCloseLine className = "w-6 h-6 text-white mr-2" onClick = { () => setMobileMenu( false ) } /> : 
      <HiOutlineMenu className = "w-6 h-6 text-white mr-2" onClick = { () => setMobileMenu( true ) } /> }  
    </div>
    { /* Mobile menu for smaller devices */ }
    <div className = { `absolute top-0 h-screen w-2/3 backdrop-blur-lg z-10 p-6 md:hidden smooth-transition
    ${ mobileMenu ? 'left-0' : '-left-full' }` }  // if mobileMenu is true ( open ), display menu, else hide menu
    style = { { background: 'linear-gradient(57deg, rgba(172,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(172,0,0,1) 100%)', opacity: .95 } }> { /* sidebar background gradient */ }
      <img src =  { logo } alt = "logo" className = "w-full h-14 object-contain" /> { /* logo */ }
      <NavLinks handleClick = { () => setMobileMenu( false ) } />
    </div>
    </>
  )

}

export default Sidebar;
