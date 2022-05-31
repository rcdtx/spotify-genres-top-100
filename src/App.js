import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import Column from './components/Column';


const genreList = {
  'Alternative Rock': '0aXgSLLFYRmT87Fit4lU35',
  'Ambient': '1pbOkTqfvFgMMzKfCnTOgG',
  'Blues': '5HUYim9Ao38y3lzJuuJy6a',
  'Classical': '0yYCyUiJDnlU01jjLXxErd',
  'Country': '4zZ87MUbSo1YyBj50AKQWv',
  'Dancehall': '0d2lK8zr1wzwCudVNDvccw',
  'Deep House': '7vD3EPo8uGyqJqqckZ3e6M',
  'Disco': '70ZCTyQaVN8iwsuCuYX1F6',
  'Drum and Bass': '5ALTYHhJzCasMIZuo0MqOq',
  'Dubstep': '6TgD960XDPCLsBvZJIjq4i',
  'EDM': '51V1kDRorMxXDHxmaImWCE',
  'Electronic': '7qHoNdW8d4DCjnbDZVoOMn',
  'Folk': '49B54TpeFQLFDpgl9eE8ry',
  'Rap': '3mdw5yxk21OIDtq6nZS9jC',
  'House': '5VC6LnsZoZEtUNjCQqEnKm',
  'Indie': '5M3eIQcuAIWKbIwhoCnwew',
  'Jazz': '7JEOVv3bn1sUnSuWEhVHVR',
  'Latin': '6rdVDi8QGSVeidyVDeClPj',
  'Metal': '3VxZpLk7y8GK65jJmep1ux',
  'Pop': '3mQLQ5ZVpjixLv4P6h1RMn',
  'Rhythm and Blues': '0CE9O4AdppRNfiQIsPAXkk',
  'Reggae': '2iQc86tECGhSjmSx1zViIC',
  'Reggaeton': '0SVoqDG5ReplwbaqROD1QS',
  'Rock': '3GhEQkyQCTZOzzCOw8cNP5',
  'Soundtrack': '5uKhl4UAg4EH8QxaToxDT7',
  'Techno': '6kio0EUKcGw4dcc2h9XSH5',
  'Trance': '4OB0bbEGXiKnXxZAo0eGUN',
  'Trap': '6mxg4NxqkR8cr1o8hBPG5A'
}


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function App() {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <img src={logo} className="App-logo" alt="logo" />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <h3>Add Genre:</h3>
        <TextField id="outlined-basic" label="genre" variant="outlined" />
        <Button variant="contained">Add</Button>

        <Grid container direction="row" spacing={4}>
          {Object.entries(genreList).map(([genre, uri], index) => (
            <Grid item key={index}>
              <Column genre={genre} uri={uri}></Column>
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    </>
  );
}
