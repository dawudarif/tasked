import Footer from './components/Footer';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  const [name, setName] = useState<string>('');

  const updateName = (name: string) => setName(name);

  return (
    <>
      <Header name={name} updateName={updateName} />
      <Routes>
        <Route index path='/' element={<Home updateName={updateName} />} />
        <Route index path='/register' element={<Register />} />
        <Route index path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
