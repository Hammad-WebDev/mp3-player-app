import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [folder, setFolder] = useState('1hamd');
    const [url, setUrl] = useState('')
    const [songIndex, setSongIndex] = useState(0)
    const [show, setShow] = useState(false)

    return (
        <SongContext.Provider value={{ folder, setFolder, url, setUrl, show, setShow, songIndex, setSongIndex }}>
            {children}
        </SongContext.Provider>
    );
};
