import React, { useContext, useEffect, useRef, useState } from 'react'
import { SongContext } from '../context/SongContext'

const Playbar = () => {
    const { url, songIndex, setSongIndex } = useContext(SongContext)

    const [checkFirstReload, setCheckFirstReload] = useState(0)
    const [playSvg, setPlaySvg] = useState(false)
    const [volSvg, setVolSvg] = useState(true)
    const [duration, setDuration] = useState('00:00')
    const [currentTime, setCurrentTime] = useState('00:00')
    const [seekBarValue, SetSeekBarValue] = useState(0)
    const [checkbox, SetCheckbox] = useState(true)
    const audio = useRef()
    const volRange = useRef()

    // MILISECONDS FORMAT TO MINUT FORMAT COVERTER
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    
    
    
    useEffect(() => {
        setCheckFirstReload((no) => no + 1)
        setAudioSrcFunc()
        SetSeekBarValue(0)

        if (checkFirstReload > 1) {
            setPlaySvg(true)
            audio.current.play()
        }

    }, [url, songIndex])

    const setAudioSrcFunc = () => {
        if (url) {
            audio.current.src = url[songIndex].mp3
        }
    };

    const handlePlay = () => {
        setPlaySvg(true)
        audio.current.play()
    };

    const handlePause = () => {
        setPlaySvg(false)
        audio.current.pause()
    };

    const handleSeekBar = (e) => {
        let value = e.target.value
        let currAudio = audio.current
        currAudio.currentTime = (value / 100) * currAudio.duration
        SetSeekBarValue(value)
        if (playSvg) {
            currAudio.play()
        }
    };

    const handleCurrentTime = () => {
        let currAudio = audio.current
        setCurrentTime(formatTime(currAudio.currentTime))
        let progress = (currAudio.currentTime / currAudio.duration) * 100
        currAudio.duration && SetSeekBarValue(progress)
    };

    const handleDuration = () => {
        setDuration(formatTime(audio.current.duration))
    }

    const handleVolume = (e) => {
        audio.current.volume = e.target.value
        e.target.value == 0 ? setVolSvg(false) : setVolSvg(true)
    };

    const handleMute = () => {
        let currAudio = audio.current
        setVolSvg(!volSvg)
        volSvg ? currAudio.volume = 0 : currAudio.volume = .5
        volRange.current.value = currAudio.volume
    };


    const handleNextSong = () => {
        if (url.length - 1 > songIndex) {
            setSongIndex((prev) => prev + 1)
        }
    };

    const handlePrevSong = () => {
        if (songIndex !== 0) {
            setSongIndex((prev) => prev - 1)
        }
    };

    const handleAutoPlay = () => {
        if (checkbox && url.length - 1 > songIndex) {
            setSongIndex((prev) => prev + 1)
        }
    };



    return <>
        <div className="TOGGLE BUTTON absolute top-[110px] md:top-28 right-7">
            <label className="inline-flex flex-col items-center cursor-pointer">
                <span className="font-semibold text-gray-900 dark:text-gray-300">AutoPlay</span>
                <input onChange={() => SetCheckbox(!checkbox)} type="checkbox" checked={checkbox} className="sr-only peer" />
                <div className="relative w-10 h-5 bg-gray-200 rounded-full dark:bg-[#cccccc] peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:duration-300 peer-checked:bg-blue-600"></div>
            </label>
        </div>

        <div className="PLAYBAR max-md:leading-3 text-black text-center fixed bottom-2 md:bottom-5 filter invert bg-[#dad5d5] rounded-xl md:w-[66vw] w-[94%] px-4 py-2 md:pt-5 md:ml-3">
            <div className="abovebar flex justify-between flex-col md:flex-row items-center">

                <div className="SONFINFO text-black font-bold text-sm md:font-normal md:text-base px-3 md:w-[250px] text-center">{url && url[songIndex].name}</div>

                <div className="SONGBUTTONS flex my-2 md:m-0 justify-center gap-4">
                    <img onClick={handlePrevSong} className='cursor-pointer h-7 w-7 md:h-8 md:w-8' src="prevsong.svg" alt="" />

                    {playSvg ? <img className='cursor-pointer h-7 w-7 md:h-8 md:w-8' onClick={handlePause} src="pause.svg" alt="" /> : <img className='cursor-pointer h-7 w-7 md:h-8 md:w-8' onClick={handlePlay} src="play.svg" alt="" />}

                    <img onClick={handleNextSong} className='cursor-pointer h-7 w-7 md:h-8 md:w-8' src="nextsong.svg" alt="" />
                </div>
                <div className="TIME&VOLUME flex-col-reverse md:flex-row flex justify-evenly items-center">
                    <div className="SONGTIME w-[125px] text-sm md:text-base text-black px-3">{currentTime} / {duration}</div>
                    <div className="VOLUME flex justify-center items-center gap-3 cursor-pointer">
                        <div onClick={handleMute} className="max-md:w-6">
                            {volSvg ? <img className='h-6 w-6' src="volume.svg" alt="" /> : <img className='h-6 w-6' src="mute.svg" alt="" />}
                        </div>

                        <input ref={volRange} className='volume-slider cursor-pointer accent-blue-700' onChange={(e) => handleVolume(e)} min={0} max={1} step={0.01} type="range" />

                    </div>
                </div>
            </div>

            <input onChange={(e) => handleSeekBar(e)} value={seekBarValue} className='w-full h-[6px] cursor-pointer accent-red-600' type="range" />

            <audio ref={audio} preload='auto' onTimeUpdate={handleCurrentTime} onLoadedMetadata={handleDuration} onEnded={handleAutoPlay}></audio>
        </div>
    </>
}

export default Playbar