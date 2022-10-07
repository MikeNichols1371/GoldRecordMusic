import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => { 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = (e) => { 
    e.preventDefault(); // Prevents the page from refreshing
    navigate( `/search/${ searchTerm }` );
  }

  return (
    <form onSubmit = { handleSubmit } autoComplete = "off" className = "text-white focus-within:text-gray-400 p-2">
      <label htmlFor = "search-field" className = "sr-only">Search</label>
      <div className = " flex flex-row justify-start items-center">
        <FiSearch className = "h-6 w-6 ml-4" />
        <input name = "search-field" autoComplete = "off" 
        id = "search-field" placeholder = "Search.." type = "search"  value = { searchTerm } onChange = { ( e ) => setSearchTerm( e.target.value ) }
        className = "flex-1 bg-transparent border-none outline-none placeholder-white text-base text-white p-4" />
      </div>
    </form>
  );
} 

export default Searchbar;
