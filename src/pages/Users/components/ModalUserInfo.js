import React, { forwardRef, Component } from 'react'
import { Avatar, Button, Checkbox, Dialog, FormControlLabel, MenuItem, Slide, TextField } from '@mui/material'
import { getLabelHowYouKnowUs } from '../../../utils/getLabelHowYouKnowUs';
import { getLabelWhyDoYouWantBePart } from '../../../utils/getLabelWhyDoYouWantBePart';
import { WhatsApp } from '@mui/icons-material';
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../../config/init-firebase'
import { isEmpty } from 'lodash';

const Transition = forwardRef(function Transition(props, ref,) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ModalUserInfo extends Component {

  state = {
    thereAreChanges: false,
    newHash: ""
  }

  handleChangeText = (event) => {
    const { userInfo } = this.props
    const newUser = { ...userInfo, [event.target.name]: event.target.value }
    this.props.setUserInfo(newUser)
    this.setState({ thereAreChanges: true })
  }

  handleChangeHash = (event) => {
    this.setState({ newHash: event.target.value, thereAreChanges: true })
  }

  handleChangeHasPaid = () => {
    const { userInfo } = this.props

    const newUser = { ...userInfo, hasPaid: !userInfo.hasPaid }
    this.props.setUserInfo(newUser)
    this.setState({ thereAreChanges: true })
  }

  handleChangeSubscription = (event) => {
    const { userInfo } = this.props
    const newUser = { ...userInfo, subscription: event.target.value }
    this.props.setUserInfo(newUser)
    this.setState({ thereAreChanges: true })
  }

  sendReminderMessageToWhatsapp = () => {
    const { indicative, phone, name } = this.props.userInfo
    const link = `https://wa.me/${indicative}${phone}?text=${this.buildReminderMessage(name)}`
    window.open(link, '_blank')
  }

  buildReminderMessage = (name) => {
    return `Hola ${name}! De parte AsoBlockchain te queremos recordar aún puedes pagar tu membresia como Community Member.`
  }

  handleCloseModal = () => {
    this.props.toggleModalUserInfo(false)
  }

  handleSaveChanges = async () => {
    const { newHash } = this.state
    const newUser = { ...this.props.userInfo, hash: newHash }
    delete newUser.dateInscription;
    const communityMemberRef = doc(firestore, "community members", newUser.id);
    await updateDoc(communityMemberRef, newUser)
    this.props.setUpdateTable(true)
    this.handleCloseModal()
  }

  render() {
    const { thereAreChanges, newHash } = this.state
    const { userInfo, showModalUserInfo } = this.props
    if (!isEmpty(userInfo)) {
      const {
        photo,
        name,
        indicative,
        phone,
        dateInscription,
        address,
        hasPaid,
        howYouKnowAsoblockchain,
        whyDoYouWantBePart,
        subscription,
        hash,
        email
      } = userInfo
      return (
        <Dialog
          open={showModalUserInfo}
          TransitionComponent={Transition}
          disableEscapeKeyDown
          PaperProps={{ style: { width: '100%' } }}
          aria-describedby="alert-dialog-slide-description">
          <div className='p-10 flex flex-col justify-center relative'>
            <Avatar className='self-center' alt="/" src={photo} style={{ width: '5em', height: '5em' }} />
            <div className='mt-5' />
            <TextField label="Nombre" name='name' variant="outlined" type="text" value={name} onChange={this.handleChangeText} />
            <div className='mt-5' />
            <TextField label="Email" name='email' variant="outlined" type="email" value={email} onChange={this.handleChangeText} />
            <div className='mt-5' />
            <div className='grid grid-cols-[20%_80%] gap-2 pr-2'>
              <TextField label="Indicativo" name='indicative' variant="outlined" value={indicative} onChange={this.handleChangeText} />
              <TextField label="Nûmero de teléfono" name='phone' variant="outlined" type="number" value={phone} onChange={this.handleChangeText} />
            </div>
            <div className='mt-5' />
            <TextField label="Dirección" name='address' variant="outlined" value={address} onChange={this.handleChangeText} />
            <div className='mt-5' />
            <TextField label="Suscripción" variant="outlined" value={subscription} select onChange={this.handleChangeSubscription} sx={{ marginBottom: 2 }}>
              <MenuItem value="monthly">Mensual</MenuItem>
              <MenuItem value="annualy">Anual</MenuItem>
            </TextField>
            {
              hash === ""
                ? <TextField label="Hash" name='hash' variant="outlined" value={newHash} onChange={this.handleChangeHash} />
                : <span className='mt-2'><strong>Hash:</strong> {hash}</span>
            }
            <span className='mt-2'><strong>Fecha Inscripción:</strong> {dateInscription}</span>
            <span className='mt-2'><strong>Cómo nos conoció:</strong> {getLabelHowYouKnowUs(howYouKnowAsoblockchain)}</span>
            <span className='mt-2'><strong>Por qué quiso ser parte:</strong> {getLabelWhyDoYouWantBePart(whyDoYouWantBePart)}</span>
            <FormControlLabel control={<Checkbox checked={hasPaid} onChange={this.handleChangeHasPaid} />} label="¿Ya pagó?" />
            {
              !hasPaid && <Button variant="outlined" color="success" startIcon={<WhatsApp />} onClick={this.sendReminderMessageToWhatsapp}>
                Recordar Pago
              </Button>
            }
            <div className='flex justify-center mt-6'>
              <Button onClick={this.handleCloseModal} sx={{ marginRight: 1 }} variant="outlined" color='error'>Cerrar</Button>
              <Button onClick={this.handleSaveChanges} variant="contained" color="primary" disabled={!thereAreChanges}>Guardar Cambios</Button>
            </div>
          </div>
        </Dialog>
      )
    } else {
      return (<div />)
    }
  }

}

export default ModalUserInfo