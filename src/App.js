import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login'
import Register from './components/register/register';
import Notes from './components/notes/notes';
import Addnotes from './components/addnotes/addnotes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/notes' element={<Notes/>} />
        <Route path='/addnote' element={<Addnotes/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
