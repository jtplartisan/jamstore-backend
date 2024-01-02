import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'

import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserDataProvider from './context/UserDataProvider.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <UserDataProvider>

    <App />
    </UserDataProvider>
  </ChakraProvider>,
)
