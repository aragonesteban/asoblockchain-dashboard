import React, { useState } from 'react'
import ModalUserInfo from './components/ModalUserInfo'
import TableUsers from './components/TableUsers'

const Users = () => {

  const [showModalUserInfo, setShowModalUserInfo] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [updateTable, setUpdateTable] = useState(false)

  const toggleModalUserInfo = (value, user) => {
    if (user) {
      setUserInfo(user)
    }
    setShowModalUserInfo(value)
  }

  return (
    <div>
      <TableUsers
        setUpdateTable={setUpdateTable}
        updateTable={updateTable}
        toggleModalUserInfo={toggleModalUserInfo} />
      <ModalUserInfo
        toggleModalUserInfo={toggleModalUserInfo}
        showModalUserInfo={showModalUserInfo}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
        setUpdateTable={setUpdateTable} />
    </div>
  )

}

export default Users