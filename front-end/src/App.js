import './App.css';
import Header from './Componnents/Header/Header';
import Main from './Componnents/Main/Main'; 
import Register from './Componnents/Register/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Description from './Componnents/DescriptionComponnet/Description.js';



function App() {
  return (
    <BrowserRouter>  
    <Header />     
    <Routes>      
        <Route path='/' element={<Main />} />  
        <Route path='/register' element={<Register />} />             
        <Route path='/:id' element={<Description />} />                       
    </Routes>    
    </BrowserRouter>
  );
}

export default App;
