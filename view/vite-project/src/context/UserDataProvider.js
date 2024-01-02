import React, { createContext, useState } from 'react';

export const UserData = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: JSON.parse(localStorage.getItem('token')),
    userData: [JSON.parse(localStorage.getItem('user'))],
  });

  return (
    <UserData.Provider value={{ userData, setUserData }}>
      {children}
    </UserData.Provider>
  );
};

export default UserDataProvider;
