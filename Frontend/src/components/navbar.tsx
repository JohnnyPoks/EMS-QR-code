import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display: 'flex', gap: "200px"}}>
        <Link to={'/generate'}><button>Generate QR Code</button></Link>
        <Link to={'/scan'}><button>Scan Code</button></Link>
    </div>
  )
}

export default Navbar