import React from 'react'
import Navbar from '../components/navbar'

const Eventpage = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", minHeight: "100vh"}}>
        <Navbar />
        <h4>Welcome to the event</h4>
            <p>You have</p>
        <div style={{display: "flex"}}>
            <p>50: invited</p>
            <p>50: absent</p>
            <p>50: present</p>
        </div>
    </div>
  )
}

export default Eventpage