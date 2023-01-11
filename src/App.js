import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GetData from './component/GetData';
import PostData from './component/PostData';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<PostData />} />
          <Route path='/datos/:id' element={<GetData/>} />
        </Routes>
        <ToastContainer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
