import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { SongContext } from '../context/SongContext';

const SongList = ({ searchValue }) => {

    const { folder, url, setUrl, setShow, songIndex, setSongIndex, isSongPlaying, setIsSongPlaying } = useContext(SongContext)
    const [mp3, setmp3] = useState([])

    useEffect(() => {
        fetchMp3()
    }, [folder])

    const fetchMp3 = async () => {
        let res = await axios(`https://hmd-player.vercel.app/songs/${folder}`)

        setmp3(res.data)
        setSongIndex(0)
        setUrl(res.data)
    };

    let filterMp3 = mp3.filter((i) => i.name.toLowerCase().includes(searchValue.toLowerCase()))


    const handleShowAndMp3 = (index) => {
        if (filterMp3[index].mp3 === url[songIndex].mp3) {
            setShow(false)
            return
        }
        setUrl(filterMp3)
        setSongIndex(index)
        setShow(false)
    };

    const handleAudio = (event, mp3, index) => {
        event.stopPropagation()
        if (mp3.mp3 === url[songIndex].mp3) {
            if (isSongPlaying) {
                setIsSongPlaying(false)
            } else {
                setIsSongPlaying(true)
            }
        } else {
            setUrl(filterMp3)
            setSongIndex(index)
            setIsSongPlaying(true)
        }
    }


    return <>

        <div className="SONGLIST scroll-w-none overflow-auto h-[68vh] md:h-[75vh] px-2 md:mr-2 md:px-2 mb-11">
            {mp3.length > 0 && <ul>
                {filterMp3.length > 0 ? (filterMp3.map((mp3, index) => {
                    return <li key={index} onClick={() => handleShowAndMp3(index)} className={`border gap-3 items-center cursor-pointer rounded-md flex justify-between px-4 py-5 my-3 ${mp3.mp3 === url[songIndex].mp3 && 'bg-[#f8717159]'}`}>
                        <div className="text-[13px] flex items-center gap-2 w-[200px] md:w-[180px] leading-[15px]">
                            <img className='invert' src="music.svg" alt="" />
                            <span>{mp3.name}</span>
                        </div>

                        <div onClick={(event) => handleAudio(event, mp3, index)} className="Play flex items-center gap-2 font-semibold z-10">
                            <h1 className='text-[14.5px]'>Play Now</h1>
                            {(mp3.mp3 === url[songIndex].mp3 && isSongPlaying) ? (
                                <img className='invert' width={23} height={23} src="pause.svg" alt="" />
                            ) : (
                                <img className='invert' width={23} height={23} src="play.svg" alt="" />
                            )}
                        </div>
                    </li>
                })) : (<div className="text-center text-gray-400 mt-10">Sorry, no songs match your search. Please try a different keyword or they may not be available yet.</div>)}
            </ul>}
        </div>

    </>
}

export default SongList