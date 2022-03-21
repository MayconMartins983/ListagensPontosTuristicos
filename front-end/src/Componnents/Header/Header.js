import React from 'react';
import styles from './Header.module.css';
import {Link} from "react-router-dom";
import img from "./imgs/Logo.png"

const Header = () => {
  return (
    <header className={styles.header}>
        <Link to='/'><div className={styles.logo}><img src={img}/></div></Link>
        <div><Link to='/register'><button  className={styles.buttonCadastrar}>Cadastrar um ponto turístico</button></Link></div>
    </header>
  )
}

export default Header