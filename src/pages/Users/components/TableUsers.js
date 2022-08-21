import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { IconButton, InputAdornment, MenuItem, TablePagination, TextField } from '@mui/material';
import { Edit, Search } from '@mui/icons-material';
import { collection, query, getDocs } from 'firebase/firestore'
import { firestore } from '../../../config/init-firebase'
import { getLabelMonth } from '../../../utils/getLabelMonth';
import { orderBy } from 'lodash';

export default class TableUsers extends Component {

    state = {
        users: [],
        page: 0,
        rowsPerPage: 10,
        searchText: "",
        usersFiltered: [],
        orderByValue: "order_by_date"
    }

    componentDidMount() {
        this.getUsersList()
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 })
    }

    async getUsersList() {
        const queryUsers = query(collection(firestore, "community members"));
        const result = await getDocs(queryUsers)
        let users = []
        result.docs.forEach((item) => {
            users = [...users, { ...item.data(), id: item.id }]
        })
        this.setState({ users, usersFiltered: users }, () => {
            this.handleChangeOrderBy({ target: { value: "order_by_date" } })
        })
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
        this.props.toggleModalUserInfo(true, user)
    }

    handleSearch = (event) => {
        let newUsers = []
        if (event.target.value !== "") {
            newUsers = this.state.users.filter((user) => {
                return user.name.toLowerCase().includes(event.target.value.toLowerCase())
            })
        } else {
            newUsers = this.state.users
        }
        this.setState({ searchText: event.target.value, usersFiltered: newUsers })
    }

    handleChangeOrderBy = (event) => {
        let newUsers = []
        switch (event.target.value) {
            case 'order_by_date': newUsers = this.handleOrderByDate(); break;
            case 'order_by_subscription': newUsers = this.handleOrderBySubscription(); break;
            case 'order_by_pay': newUsers = this.handleOrderByPay(); break;
            default: newUsers = this.state.users; break;
        }
        this.setState({ orderByValue: event.target.value, usersFiltered: newUsers })
    }

    handleOrderByDate = () =>  orderBy(this.state.users, (user) => user.dateInscription, "desc")
    
    handleOrderBySubscription = () => orderBy(this.state.users, (user) => user.subscription, "desc")

    handleOrderByPay = () => orderBy(this.state.users, (user) => user.hasPaid, "desc")

    componentDidUpdate() {
        const { setUpdateTable, updateTable } = this.props
        if (updateTable) {
            setUpdateTable(false)
            this.getUsersList()
        }
    }

    render() {
        const { usersFiltered, page, rowsPerPage, searchText, orderByValue } = this.state
        return (
            <div>
                <div className='flex justify-between items-center'>
                    <TextField label="Buscar por nombre" name='search' variant="outlined" type="text" value={searchText} onChange={this.handleSearch} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }} />
                    <TextField className='w-[20em]' label="Ordenar por" variant="outlined" value={orderByValue} select onChange={this.handleChangeOrderBy}>
                        <MenuItem value="order_by_date">Fecha</MenuItem>
                        <MenuItem value="order_by_subscription">Suscripciôn</MenuItem>
                        <MenuItem value="order_by_pay">Pago</MenuItem>
                    </TextField>
                </div>
                <div className='mt-6' />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ height: 60, background: '#161637' }}>
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
                            {usersFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Avatar alt="/" src={user.photo} />
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={usersFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }
}