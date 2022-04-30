import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Favorite from './containers/Favorite';
import HomePage from './containers/Home';
import MovieDetail from './containers/MovieDetails';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
  </BrowserRouter>
  );
}

export default App;
