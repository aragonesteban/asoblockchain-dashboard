import React, { useState } from 'react'
import FormLogin from './components/FormLogin'

import { auth } from '../../config/init-firebase';
import { useNavigate } from 'react-router';
import { Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setShowError(false)
      await auth.signInWithEmailAndPassword(auth.getAuth(), email, password);
      navigate('/')
    } catch (error) {
      setShowError(true)
    }
  };

  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <FormLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin} />
      {
        showError && <Alert className='mt-10' severity="error" color="error">
          Correo electronico o constraseña invalido.
        </Alert>
      }
    </div>

  )
}

export default Login