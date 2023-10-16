import Footer from './components/Footer';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/register' element={<Register />} />
        <Route index path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
