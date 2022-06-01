import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';


export default function Column({ genre, uri }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/api/get_playlist/${genre}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setData(data));
    }, [genre]);

    return (
        <>
            <TableContainer sx={{ maxHeight: 600, maxWidth: 500, minWidth: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'}>
                                <Link href={`https://open.spotify.com/playlist/${uri}`}> {genre} </Link>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((song, index) => (
                            <TableRow hover key={index}>
                                <TableCell key={index} align={'left'}>
                                    {index + 1}. {song} -
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
