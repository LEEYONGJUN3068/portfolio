import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Header></Header>
            <Route path="/" element={<Home/>}/>
        <Footer></Footer>
      </Routes>
    </>
  );
}

export default App;
