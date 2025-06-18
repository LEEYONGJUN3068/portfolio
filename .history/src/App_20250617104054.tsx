import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
