import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { SongContext } from '../context/SongContext';
import Playbar from './Playbar';


const Cards = () => {

    const { setFolder } = useContext(SongContext)

    const [Metadata, setMetadata] = useState([])

    useEffect(() => {
        SongsMetadata()
    }, [])


    const SongsMetadata = async () => {
        let songs = await axios('https://hmd-player.vercel.app/songs/')  
        setMetadata(songs.data)
    };

    return <>

        <div className="CARD-CONTAINER scroll-w-none mt-20 mb-32 py-10 md:mr-9 md:py-3 md:pb-28 flex gap-3 md:gap-0 xl:justify-start justify-center flex-wrap overflow-y-auto max-h-[60vh]">

            {Metadata.map((i, index) => {
                return <div key={index} onClick={() => setFolder(i.folder)} className="CARD mb-3 p-3 md:ml-8 w-[80vw] xl:w-56 group cursor-pointer transition-all duration-300 hover:bg-[#292727] bg-[#171717] text-center rounded-xl relative">

                    <div className="PLAY transition-all duration-200 absolute bottom-14 right-6 opacity-0 group-hover:opacity-100 group-hover:bottom-24">
                        <img src="circlePlay.svg" alt="" />
                    </div>

                    <img className='rounded-xl h-[40vh] xl:h-[43vh] w-full' src={i.cover} alt="coverPhoto" />

                    <h2 className='font-bold text-xl'>{i.name}</h2>
                    <p className='text-sm leading-4'>{i.des}</p>
                </div>
            })}

            <Playbar />

        </div>







    </>
}

export default Cards