const express = require('express')
const app = express()
const env = require('dotenv')
const { createClient } = require('@supabase/supabase-js')
const cors = require('cors')
env.config() 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({ origin: 'https://hmd-player.netlify.app' }))

const supabase = createClient(process.env.supabaseUrl, process.env.supabaseKey)


app.get('/', (req, res) => {
    res.send("this server is running")
})

app.get('/songs', (req, res) => {

    const fetchInfoData = async () => {
        try {

            let songs = await supabase.storage.from('songs').list('');

            if (!songs.data || songs.data.length === 0) {
                return res.status(404).json({ message: "No songs folder found." });
            }


            let urls = songs.data.map((song) => ({
                url: `${process.env.supabaseUrl}/storage/v1/object/public/songs/${song.name}/info.json`,
                coverUrl: `${process.env.supabaseUrl}/storage/v1/object/public/songs/${song.name}/cover.jpg`,
                folder: song.name
            }));


            const info = await Promise.all(urls.map(async (url) => {
                const data = await fetch(url.url);
                const res = await data.json();

                return { name: res.title, des: res.description, cover: url.coverUrl, folder: url.folder };
            }));


            res.status(200).json(info);

        } catch (error) {
            console.error("Error fetching song data:", error);
            res.status(500).json({ message: "Failed to fetch song data" });
        }
    };


    fetchInfoData()

})



app.get('/songs/:folder', async (req, res) => {

    const getMp3Urls = async () => {
        try {
            const folder = req.params.folder;

            const songs = await supabase.storage.from("songs").list(folder);

            if (!songs.data || songs.data.length === 0) {
                return res.status(404).json({ message: "No songs found in this folder." });
            }

            const mp3Urls = songs.data.filter((file) => file.name.endsWith("mp3"))
                .map((file) => ({
                    mp3: `${process.env.supabaseUrl}/storage/v1/object/public/songs/${folder}/${file.name}`,
                    name: file.name
                }));

            if (mp3Urls.length < 1) {
                return res.status(404).json({ message: 'No mp3 found in this folder.' })
            }

            res.status(200).json(mp3Urls);

        } catch (error) {
            console.error("Error fetching MP3 URLs:", error);
            res.status(500).json({ message: "Failed to fetch MP3 URLs." });
        }

    };

    getMp3Urls()

})

module.exports = app;