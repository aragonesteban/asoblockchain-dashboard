import React, { useEffect, useState } from 'react'
import TextEditor from '../../components/TextEditor'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { firestore } from '../../config/init-firebase'
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore'

const PolicyPrivacy = () => {


  const [contentPolicyAndPrivacy, setContentPolicyandPrivacy] = useState({ value: "" })
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    getPolicyAndPrivacy()
  }, [])

  const getPolicyAndPrivacy = async () => {
    const queryPolicyAndPrivacy = query(collection(firestore, "policy and privacy"));
    const result = await getDocs(queryPolicyAndPrivacy)
    result.docs.forEach((item) => {
      setContentPolicyandPrivacy({
        id: item.id,
        value: item.data().value
      })
    })
  }

  const handleChangeContent = (content) => {
    setContentPolicyandPrivacy({ id: contentPolicyAndPrivacy.id, value: content })
  };

  const savePolicyAndPrivacy = () => {
    console.log(contentPolicyAndPrivacy)
    const policyAndPrivacyCollection = doc(firestore, 'policy and privacy', contentPolicyAndPrivacy.id)
    updateDoc(policyAndPrivacyCollection, { value: contentPolicyAndPrivacy.value })
      .then((response) => {
        setSaveSuccess(true)
      }).catch((e) =>
        console.error(e)
      )
  }

  return (
    <div className='h-screen flex flex-col items-center'>
      <span className='text-3xl mt-6 font-bold'>Política y privacidad de datos</span>
      <div className='h-12' />
      <TextEditor content={contentPolicyAndPrivacy.value} handleChangeContent={handleChangeContent} />
      <div className='mt-20'>
        <Button variant="contained" onClick={savePolicyAndPrivacy}>Guardar</Button>
      </div>
      {
        saveSuccess &&
        <Alert className='mt-6' severity="success">
          <AlertTitle>Guardado exitosamente</AlertTitle>
        </Alert>
      }
    </div>
  )
}

export default PolicyPrivacy