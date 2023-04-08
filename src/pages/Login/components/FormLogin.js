import { Button, TextField } from '@mui/material'
import React from 'react'
import logoAsoblockchain from '../../../assets/logo_color.png'

const FormLogin = ({ email, password, setPassword, setEmail, handleLogin }) => {

  return (
    <div>
      <div className='flex flex-col'>
        <img className='w-3/5 mb-10 self-center' src={logoAsoblockchain} alt="/" />
        <TextField
          className='inline-block'
          id="email"
          value={email}
          label="Email"
          variant="outlined"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          margin='dense' />
        <TextField
          className='inline-block'
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          type="password"
          value={password}
          margin='dense' />
        <div className='mt-8'>
          <Button className='w-full' variant="contained" onClick={handleLogin}>Entrar</Button>
        </div>
      </div>
    </div>
  )
}

export default FormLogin