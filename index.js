//bost node rewrite.
// licensed under the BSD-3-Clause license.
import express from "express";
import path from 'node:path';
import Database from 'easy-json-database';
const db = new Database("./bost-database.json", {
    snapshots: {
        enabled: true,
        interval: 48 * 60 * 60 * 1000, //2 days instead of 1 because some people make really big websites and i dont wana take up the entire storage
        folder: './backups/'
    }
});
const app = express()
const port = 7837
const currentDirectory = import.meta.dirname;

app.use(express.static('frontend'));

//used so legacy urls work on any server
function getHostUrl(req) {
    const hostname = req.hostname;
    const protocol = req.protocol;
    const port = req.app.get('port');

    return `${protocol}://${hostname}:${port}`;
}


app.get('/site/:site', async (req, res) => {
    const packet = req.params;
})

//legacy version, redirects to modern version
app.get('/site.php', async (req, res) => {
    const packet = req.query;
    const hostURL = getHostUrl(req);
    try {
        res.redirect(`${hostURL}/site/${encodeURIComponent(packet.page)}`)
    } catch (error) {
        res.send()
    }
})

app.listen(port, () => {
  console.log(`Bost listening on port ${port} ${[":P", ":3", ":)", ":D", "c:", "(•_•) ( •_•)>⌐■-■ (⌐■_■)"][6 * Math.random() | 0]}`)
})