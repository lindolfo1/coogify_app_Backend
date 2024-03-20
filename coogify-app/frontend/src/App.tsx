import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Setup } from './pages/Setup';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Upload } from './pages/Upload';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';
import { Subscription } from './pages/Subscription';
import { Payment } from './pages/Payment';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
