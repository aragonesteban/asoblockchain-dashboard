import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

const TableUsers = () => {

    const openUserInfo = () => {
        console.log("sisas");
    }

    return (
        <TableContainer component={Paper} onClick>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ background: '#161637' }}>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
                        <TableCell sx={{ color: 'white' }}>Email</TableCell>
                        <TableCell sx={{ color: 'white' }}>Telefono</TableCell>
                        <TableCell sx={{ color: 'white' }}>Fecha Inscripción</TableCell>
                        <TableCell sx={{ color: 'white' }}>Suscripción</TableCell>
                        <TableCell sx={{ color: 'white' }}>¿Ha pagado?</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0, cursor: 'pointer' } }}>
                            <TableCell>
                                <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" />
                            </TableCell>
                            <TableCell>Esteban Aragon</TableCell>
                            <TableCell>esteban.aragonm@gmail.com</TableCell>
                            <TableCell>+57 3195023674</TableCell>
                            <TableCell>06 Jun 2022</TableCell>
                            <TableCell>Mensual</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell>
                                <IconButton>
                                    <Edit />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableUsers