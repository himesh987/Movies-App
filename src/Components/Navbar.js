import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex' , background:'aqua' , padding:'1'}}>
        <Link to="/" style={{textDecoration:'none'}}><h1>𝕄𝕠𝕧𝕚𝕖𝕤 𝔸𝕡𝕡🎬</h1></Link>
        <Link to="/favourite" style={{textDecoration:'none'}}><h2 style={{marginLeft:'2rem' , marginTop:'0.3rem'}}>𝔽𝕒𝕧𝕠𝕦𝕣𝕚𝕥𝕖𝕤 ❤</h2></Link>
      </div>
    )
  }
}
