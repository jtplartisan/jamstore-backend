import './App.css'
import {BrowserRouter , Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Vendor from './components/Vendor'
function App() {

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/vendor' element={<Vendor/>}/>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
