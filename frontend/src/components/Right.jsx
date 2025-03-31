import React, { useContext } from 'react'
import Cards from './Cards'
import { SongContext } from '../context/SongContext'
const Right = () => {
    const { setShow } = useContext(SongContext)

    return <>
        <div className="RIGHT bg-[#121212] text-white min-h-screen md:mb-4 flex flex-col rounded-none absolute w-full m-0 p-0 md:mr-2 xl:relative xl:w-[71vw] xl:mt-4 xl:p- xl:rounded-md">
            <div className="HEADER flex justify-between bg-[#101010] w-full h-16">
                <div className="HAMBURGER-CONTAINER ml-3 flex gap-2">
                    <img onClick={() => setShow(true)} width="30" className="xl:invisible invert" src="hamburger.svg" alt="" />

                    <img src="leftArrow.svg" width={25} height={25} alt="" />
                    <img src="rightArrow.svg" width={25} height={25} alt="" />

                </div>

                <div className="buttons flex items-center gap-5 mx-4">
                    <button className="text-[#9e9e9e] font-bold text-[15px] hover:text-base hover:text-white">Sign up</button>
                    <button className="hover:font-bold text-black bg-white rounded-3xl w-20 h-10">Log in</button>
                </div>
            </div>

            <div className="PLAYLIST p-4">
                <div className="LOGO-HEADING flex gap-2">
                    <img src="logo.png" width={60} height={60} alt="Logo" />
                    <h1 className='text-3xl font-bold'>Playlists</h1>
                </div>

                <Cards />
            </div>

        </div>
    </>
}

export default Right