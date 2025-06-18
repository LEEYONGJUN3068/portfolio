import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
          <Header></Header>
          <Home></Home>
          <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
