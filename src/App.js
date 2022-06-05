import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Column from './components/Column';


const baseGenreList = {
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
  const initColumnList = Object.entries(baseGenreList).map(([genre, uri], index) => (
    <Grid item key={index}>
      <Column genre={genre} uri={uri}></Column>
    </Grid>
  ))

  const [userColumnList, setuserColumnList] = useState([]);

  const textFieldRef = useRef();

  const onAddBtnClick = () => {
    setuserColumnList([
      <Grid item key={userColumnList.length + 1}>
        <Column genre={textFieldRef.current.value} uri={'#'}></Column>
      </Grid>, ...userColumnList,])
    textFieldRef.current.value = null
  }

  const onEnter = () => {
    setuserColumnList(prevColumnList => [
      <Grid item key={prevColumnList.length + 1}>
        <Column genre={textFieldRef.current.value} uri={'#'}></Column>
      </Grid>, ...prevColumnList,])
    textFieldRef.current.value = null
  }

  return (
    <>
      <Typography variant="h2" align={'center'} sx={{ fontWeight: 'bold' }}>Spotify Top Tracks</Typography>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Stack direction="row" spacing={5} justifyContent="center">
                <TextField id="outlined-basic" label="genre" variant="outlined" inputRef={textFieldRef} onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    onEnter();
                  }
                }} />
                <Button variant="contained" onClick={onAddBtnClick} >Add</Button>
              </Stack>
            </Container>
          </Box>
          <Container >
            <Grid container direction="row" spacing={5} alignItems="center"
              justifyContent="center">
              {userColumnList}
              {initColumnList}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
}
