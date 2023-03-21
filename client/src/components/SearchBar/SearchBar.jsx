import { useContext, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { depContext } from '../../pages/User/Departments/DepartmentPage';
const SearchBar = () => {

    const { setSearch, SearchItem, } = useContext(depContext)

    return (
        <div className="flex justify-center mb-3 mt-5">
            <div className="relative w-3/4 md:w-3/4 lg:w-1/2 max-w-md">
                <div className="flex items-center justify-between bg-mainColor rounded-sm shadow-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        required
                        className="block w-full py-3 pr-12 rounded-sm focus:border-none text-gray-900 placeholder-gray-400 border-gray-500/20"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </div>
        </div>



    );
}

export default SearchBar