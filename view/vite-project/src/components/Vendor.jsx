import React, { useContext } from 'react'
import { UserData } from '../context/userDataContext';

const Vendor = () => {
 const {userData} = useContext(UserData);
  return (
    <div>Vendor</div>
  )
}

export default Vendor