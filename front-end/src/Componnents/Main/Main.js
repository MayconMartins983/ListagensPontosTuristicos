import React from 'react';
import styles from './main.module.css';
import Home from '../HomeComponnent/Home.js';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
import Description from '../DescriptionComponnet/Description';




const Main = () => {
  const [data, setData] = useState(null)
    const fetchData = async () => {
      await axios.get('https://localhost:44371/api/pontosturisticos')
      .then((response)=> {
        setData(response.data)    
      })
      
  }

//filtro
  const [changeTarget, setchangeTarget] = useState('')
  const handleChange = (event) => {
    const {value} = event.target
    setchangeTarget(value)
  }
  

  const [fetchFilter, setFetchFilter] = useState(false)
  const testeFilter = async () => {
    await axios.get(`https://localhost:44371/api/PontosTuristicos/PontoTuristicoPorName?name=${changeTarget}`)
    .then((response)=> {
      setFetchFilter(response.data)         
    })    
}

// paginação 
    
    const [pagination, setpagination] = useState(null)
    const [virtualPage, setVirtualPage] = useState(0)
    
    const pageCurrent = async () => {
      await axios.get(`https://localhost:44371/api/PontosTuristicos/skip/${virtualPage}/take/${2}`)
      .then ((response) =>  setpagination(response.data))
    }

    

    const paginationNext = () => {
      if (virtualPage < (pagination.totalCount - 2)) {
        setVirtualPage(virtualPage + 2 )
      }
    }

    const paginationBack = () => {
      if (virtualPage > 0) {
        setVirtualPage(virtualPage - 2)
      }     
  }

   
    
    
    

  useEffect(()=> {
    fetchData()
    pageCurrent()
    
    
    
  },[virtualPage])

  if (data === null) return null
  if (pagination === null) return null
 
  return (
    <div className={styles.conteiner}>        
        <div className={styles.filterBox}>
            <input placeholder='Digite um termo para buscar um ponto turístico' onChange={handleChange} className={styles.inputFilter}/>
            <button  onClick={testeFilter}  className={styles.buttonFilter}>Buscar</button>
        </div>

        <div className={styles.main}>
            <h1>Lista de Pontos turísticos</h1>
            
           

            {fetchFilter ? fetchFilter.map((e)=> {
              return <Link key={e.id} to={`/${e.id}`}><Home  name= {e.name} localizacao={e.endereco}/></Link>
            })  : pagination.dados.map((e)=> {
              return <Link key={e.id} to={`/${e.id}`}><Home  name= {e.name} localizacao={e.endereco}/></Link>
            })}
            

        </div>
        
        <div className={styles.footerButton}>
          <button className={styles.buttonFilter} onClick={paginationBack}>Anterior</button>
          <button className={styles.buttonFilter} onClick={paginationNext}>Próximo</button>
        </div>
    </div>
   
  )
}

export default Main 