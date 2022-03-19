import React from 'react';
import styles from './main.module.css';
/* import Home from '../HomeComponnent/Home.js'; */
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
/* import Description from '../DescriptionComponnet/Description'; */



const Main = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
      await axios.get('https://localhost:44371/api/pontosturisticos')
      .then((response)=> {
        setData(response.data)    
      })
      
  }
  
  useEffect(()=> {
    fetchData()
  },[])

  if (data === null) return null
  return (
    <div className={styles.conteiner}>
        <div className={styles.filterBox}>
            <input placeholder='Digite um termo para buscar um ponto turístico' className={styles.inputFilter}/>
            <button className={styles.buttonFilter}>Buscar</button>
        </div>

        <div className={styles.main}>
            <h1>Lista de Pontos turísticos</h1>
            
          {/*   {data.map((e)=> {
              return <Link key={e.id} to={`/${e.id}`}><Home  name= {e.name} localizacao={e.endereco}/></Link>
            })} */}
            

        </div>
    </div>
   
  )
}

export default Main 