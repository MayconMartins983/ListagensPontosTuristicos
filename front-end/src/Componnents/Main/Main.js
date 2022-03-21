import React from 'react';
import styles from './main.module.css';
import Home from '../HomeComponnent/Home.js';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';



const Main = () => {
  
//Filtro
  const [getData, setgetData] = useState([])
  const [dadosFiltrados, setDadosFiltrados] = useState([])
  const [inputValueFilter, setImputValueFilter] = useState('')

  const handleChangeFilter = ({target}) => {
    setImputValueFilter(target.value)
    
  }

  const searchData = async () => {
    const response = await axios.get('https://localhost:44371/api/pontosturisticos')
    setgetData(response.data)    
  }   

  const dadosTratados = () => {
    if (getData) {
      const dataFilters = getData.filter((data) => {
        return  data.name.toUpperCase().includes(inputValueFilter.toUpperCase())
        || data.descricao.toUpperCase().includes(inputValueFilter.toUpperCase())
        || data.endereco.toUpperCase().includes(inputValueFilter.toUpperCase())        
        }) 
    if(dataFilters) {
      setDadosFiltrados(dataFilters)
      }        
    }
  }
  
// Paginação 
  const [pagination, setpagination] = useState(null)
  const [virtualPage, setVirtualPage] = useState(0)
  
  const totalPage = 3

  const pageCurrent = async () => {
    try { 
      const response = await axios.get(`https://localhost:44371/api/PontosTuristicos/skip/${virtualPage}/take/${totalPage}`)
      setpagination(response.data)
    }
    catch(error) {
    console.log(error)
  }
} 

  const paginationNext = () => {
    if (virtualPage < (pagination.totalCount - totalPage)) {
      setVirtualPage(virtualPage + totalPage )
    }
  }

  const paginationBack = () => {
    if (virtualPage > 0) {
      setVirtualPage(virtualPage - totalPage)
    }     
}

  useEffect(()=> {
    pageCurrent()
    searchData()
    dadosTratados()
  },[virtualPage, inputValueFilter ])
 
  if (getData === null) return null 
  if (pagination === null) return null
 
  return (
    <div className={styles.conteiner}>        
        <span className={styles.filterBox}>            
            <input placeholder='Digite uma palavra para buscar um ponto turístico'  onChange={handleChangeFilter}  className={styles.inputFilter} />
        </span>    

        <div className={styles.main}>
            <h1>Lista de Pontos Turísticos</h1>

            {inputValueFilter ? dadosFiltrados?.map((e)=> {
              return <Link key={e.id} to={`/${e.id}`}><Home  name= {e.name} localizacao={e.endereco}/></Link>})
            : pagination.dados.map((e)=> {
              return <Link key={e.id} to={`/${e.id}`}><Home  name= {e.name} localizacao={e.endereco}/></Link>
            })}
        </div>
        
        <div className={styles.footerButton}>
          <button className={styles.buttonFilter} disabled={inputValueFilter ? true : false} onClick={paginationBack}>Anterior</button>
          <button className={styles.buttonFilter} disabled={inputValueFilter ? true : false} onClick={paginationNext }>Próximo</button>
        </div>
    </div>
   
  )
}

export default Main 