import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Works from './pages/Works'
import Studio from './pages/Studio'
import Contact from './pages/Contact'
//import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/k-works" element={<Home />} />
          <Route path="/k-works/works" element={<Works />} />
          <Route path="/k-works/studio" element={<Studio />} />
          <Route path="/k-works/contact" element={<Contact />} />
         

        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App