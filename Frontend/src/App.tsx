import './App.css'
import QrCodeGenerator from './components/QR-Code'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Eventpage from './pages/eventpage'
import QrScan from './components/qr-scan'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Eventpage />} />
          <Route path="/scan" element={<QrScan />} />
          <Route path="/generate" element={<QrCodeGenerator />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
