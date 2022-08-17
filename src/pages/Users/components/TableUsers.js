import React, { Component } from 'react';
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
import { collection, query, getDocs } from 'firebase/firestore'
import { firestore } from '../../../config/init-firebase'
import { getLabelMonth } from '../../../utils/getLabelMonth';

export default class TableUsers extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.getUsersList()
    }

    async getUsersList() {
        const queryUsers = query(collection(firestore, "community members"));
        const result = await getDocs(queryUsers)
        let users = []
        result.docs.forEach((item) => {
            users = [...users, { ...item.data(), id: item.id }]
        })
        this.setState({ users })
    }

    setLabelSubscription(suscription) {
        if (suscription && suscription !== "") {
            return suscription === "monthly" ? "Mensual" : "Anual"
        } else {
            return "Sin Suscripción"
        }
    }

    setLabelDateInscription(dateInscription) {
        if (dateInscription) {
            const date = new Date(dateInscription.seconds * 1000)
            return `${date.getDate()} ${getLabelMonth(date.getMonth())} ${date.getFullYear()}`
        }
    }

    openModalUserInfo(user) {
        user = { ...user, dateInscription: this.setLabelDateInscription(user.dateInscription) }
        console.log(user)
        this.props.toggleModalUserInfo(true, user)
    }

    componentDidUpdate() {
        const { setUpdateTable, updateTable } = this.props
        if (updateTable) {
            setUpdateTable(false)
            this.getUsersList()
        }
    }

    render() {
        return (
            <TableContainer component={Paper}>
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
                        {this.state.users.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <Avatar alt="Remy Sharp" src={user.photo} />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.indicative} {user.phone}</TableCell>
                                <TableCell>{this.setLabelDateInscription(user.dateInscription)}</TableCell>
                                <TableCell>{this.setLabelSubscription(user.subscription)}</TableCell>
                                <TableCell>{user.hasPaid ? 'Si' : 'No'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.openModalUserInfo(user)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}