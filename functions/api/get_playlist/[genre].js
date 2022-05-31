import { Buffer } from 'buffer';

export async function onRequestGet(context) {
    const client_id = context.env.CLIENT_ID
    const client_secret = context.env.CLIENT_SECRET
    const base64Credentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + base64Credentials
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    };
    console.log(context.genre)

    const _getTopTracks = async (token, genreId) => {
        const result = await fetch(`https://api.spotify.com/v1/search?q=genre:%20${genreId}&type=track&limit=50`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.tracks;
    };

    const token = await _getToken();
    const tracks = await _getTopTracks(token, context.genre);
    const topTracks = tracks.items;
    const topTracksSorted = topTracks.sort((a, b) => b.popularity - a.popularity || Date.parse(b.album.release_date) - Date.parse(a.album.release_date));

    const filteredTracks = topTracksSorted.map(item => item.name)
    return new Response(JSON.stringify(filteredTracks))
}

// onRequest({'env': {'CLIENT_ID': 'dd4ec20ff01e4953af9a752104e97463', 'CLIENT_SECRET': 'f4a442d2c1c34bf881d0aa2973df147b'}})
