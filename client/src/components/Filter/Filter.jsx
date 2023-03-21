import { IconButton } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import './filter.css'
import { drPaginationContext } from "../../pages/User/DoctorViewingPage/DoctorList";

const Filter = () => {
    const {sort,filter,setSort,setFilter,setSearch} = useContext(drPaginationContext)
    const [isOpen, setIsOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    return (
        <div className="flex flex-col justify-center items-center mt-14 mr-10 w-full">

            <div className="inline-flex bg-white justify-center w-full rounded-md">
                <div className="relative w-3/5 md:w-3/4 lg:w-1/2 max-w-md rounded">
                    <div className="flex items-center justify-between bg-mainColor rounded shadow-sm">
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

                <div className="relative mt-2">
                    <IconButton onClick={() => setIsOpen(isOpen => !isOpen)}  color="primary" aria-label="add to shopping cart">
                        <FilterAltIcon />
                    </IconButton>
                    <IconButton onClick={() => setSortOpen(sortOpen => !sortOpen)}  color="primary" aria-label="add to shopping cart">
                        <SortIcon />
                    </IconButton>

                    {

                        isOpen && <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                            <h2 className="ms-3 mt-2 text-textBlue font-semibold">Filter</h2>
                            <div className="p-2 text-sm">
                                <label className="inline-flex items-center mt-2">
                                    <input type="radio" name="sortOption" value="price-lt-700" className="form-radio h-3 w-3 text-indigo-600 focus:outline-none" checked={filter==='price-lt-700'} onChange={(e)=>setFilter(e.target.value)}/>
                                    <span className="ml-2 text-gray-700">less than 700</span>
                                </label>
                                <label className="inline-flex items-center mt-2">
                                    <input type="radio" name="sortOption" value="price-lt-1000" className="form-radio h-3 w-3 text-indigo-600" checked={filter==='price-lt-1000'} onChange={(e)=>setFilter(e.target.value)}/>
                                    <span className="ml-2 text-gray-700">less than 1000</span>
                                </label>
                                <label className="inline-flex items-center mt-2 ">
                                    <input type="radio" name="sortOption" value="exp-gt-10" className="form-radio h-3 w-3 text-indigo-600" checked={filter==='exp-gt-10'} onChange={(e)=>setFilter(e.target.value)}/>
                                    <span className="ml-2 text-gray-700">experience more than 10yrs</span>
                                </label>
                                <p className="text-sm text-primary ms-3 mt-2 mb-2 cursor-pointer" onClick={()=>setFilter('')}>clear all</p>
                            </div>
                        </div>

                    }
                    {

                        sortOpen && <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                            <h2 className="ms-3 mt-2 text-textBlue font-semibold">Sort By</h2>
                            <div className="p-2 text-sm">
                                <label className="inline-flex items-center mt-2">
                                    <input type="radio" name="sortOption" value="price-high-low" className="form-radio h-3 w-3 text-indigo-600 focus:outline-none" checked={sort==='price-high-low'} onChange={(e)=>setSort(e.target.value)}/>
                                    <span className="ml-2 text-gray-700">Price High To Low</span>
                                </label>
                                <label className="inline-flex items-center mt-2">
                                    <input type="radio" name="sortOption" value="price-low-high" className="form-radio h-3 w-3 text-indigo-600" checked={sort==='price-low-high'} onChange={(e)=>setSort(e.target.value)} />
                                    <span className="ml-2 text-gray-700">Price Low To High</span>
                                </label>
                                <label className="inline-flex items-center mt-2">
                                    <input type="radio" name="sortOption" value="exp-high-low" className="form-radio h-3 w-3 text-indigo-600" checked={sort==='exp-high-low'} onChange={(e)=>setSort(e.target.value)} />
                                    <span className="ml-2 text-gray-700">Experience</span>
                                </label>
                                <p className="text-sm text-primary ms-3 mt-2 mb-2 cursor-pointer" onClick={()=>setSort('')}>clear all</p>
                            </div>
                        </div>




                    }
                </div>
            </div>
        </div>
    );
};

export default Filter;
