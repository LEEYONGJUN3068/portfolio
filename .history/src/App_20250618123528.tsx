import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home'; // Home 컴포넌트 임포트
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;