import React, { useContext } from 'react'
import SongList from './SongList'
import { SongContext } from '../context/SongContext'
import { useState } from 'react'

const Left = () => {
  const { show, setShow } = useContext(SongContext)
  const [search, setSearch] = useState(true)
  const [searchValue, setSearchValue] = useState('')


  return <>
    <div className={`LEFT relative ${show ? "right-0 " : "right-full"} duration-300 ease-in-out xl:right-0 bg-black xl:w-[29vw] md:w-[50vw] flex flex-col p-0 md:p-4 text-white max-md:w-full z-10 max-md:p-2`}>

      <div className="TOP bg-[#121212] rounded-md w-full h-[8.5rem]">
        <div className="LOGO flex items-center m-3 gap-2">
          <img src="logo.png" width={70} height={70} alt="Logo" />
          <h1 className='text-3xl font-bold'>Player</h1>
          {/* cross button img */}
          {show && <img onClick={() => setShow(false)} className='invert absolute right-6 h-6 w-6' src="close.svg" alt="" />}
        </div>

        <div className="HOME ml-3 leading-8">
          <div className="font-bold flex items-center gap-3">
            <img className='invert' src="home.svg" width={15} height={15} alt="" />
            <span>Home</span>
          </div>

          {/* SEARCH BAR */}
          <div className="font-bold flex items-center gap-3">
          <div onClick={() => setSearch(!search)} className="font-bold flex items-center gap-3">
            <img className='invert cursor-pointer' src="search.svg" width={15} height={15} alt="" />
            <span className='cursor-pointer'>Search</span>
          </div>
            {<input onChange={(e) => setSearchValue(e.target.value)} className={`${search? 'opacity-0 w-0' :'w-[60%]'} duration-100 ease-in-out rounded-full h-5 font-normal outline-none text-black pl-3`} type="text" value={searchValue} />}
          </div>

        </div>
      </div>

      <div className="LIBARARY relative bg-[#121212] h-[87vh] md:h-full rounded-md mt-[5px] w-full">

        <div className="HEADING flex items-center m-7 gap-3">
          <img className='invert' src="playlist.svg" width={27} height={27} alt="" />
          <h1 className='font-bold text-lg'>Your Libarary</h1>
        </div>

        <SongList searchValue={searchValue} />

        <footer className='text-gray-500 text-sm absolute bottom-[16px] md:bottom-3 text-center w-full tracking-widest'>
          © 2024 HMD Player. All Rights Reserved.
        </footer>
      </div>
    </div>
  </>
}

export default Left