import React, { Component } from 'react'


export default class extends Component {
  render() {
    return (
      <div>
        <thead>
          <tr>
            <th>{this.props.genre}</th>
          </tr>
        </thead>
        <div>
          <table>
            <tbody>
              {this.props.tracks.map(item => (
                <tr><td>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export async function getStaticProps() {
  const client_id = process.env.CLIENT_ID
  const client_secret = process.env.CLIENT_SECRET
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

  const _getTopTracks = async (token, genreId) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=genre:%20${genreId}&type=track&limit=50`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.tracks;
  };

  const token = await _getToken();
  const tracks = await _getTopTracks(token, "EDM");

  const topTracks = tracks.items;
  const topTracksSorted = topTracks.sort((a, b) => b.popularity - a.popularity || Date.parse(b.album.release_date) - Date.parse(a.album.release_date));

  const filteredTracks = topTracksSorted.map(item => item.name)

  return {
    props: {
      genre: "EDM",
      tracks: filteredTracks
    },
  };
}