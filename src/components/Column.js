import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function Column({ genre }) {
    const [data, setData] = useState(Array(50).fill(1).map((x, y) => x + y));

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
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'}>
                                {genre}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((el, index) => (
                            <TableRow key={index}>
                                <TableCell key={index} align={'center'}>
                                    {index + 1}. {el}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
