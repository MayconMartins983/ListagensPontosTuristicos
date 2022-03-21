import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './description.module.css';
import {useEffect, useState } from 'react';
import axios from 'axios';


const Description = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const {id} = useParams()

  const fetchDataByID = async () => {
    try {
      await axios.get(`https://localhost:44371/api/pontosturisticos/${id}`)
    .then((response)=> {
      setData(response.data)    
    })
  } catch(error) {
    console.log(error)
  } 
}

  const [secondData, setSecondData] = useState(null)
  const fetchSecondApi =  async () => {
    try { 
      await axios.get(`https://localhost:44371/api/pontosturisticos`)
    .then((response)=> {
      setSecondData(response.data)  
    })
  } catch(error) {
    console.log(error)
  } 
}


  useEffect(()=> {
    fetchDataByID()
    fetchSecondApi()
  },[])

  if (data === null) return null
  if(secondData == null) return null  
  return (
    <div className={styles.conteiner}>
        <h1>{data.name}</h1>
        <p><strong className={styles.strong}>Localização: </strong>{data.endereco}</p>
        <p><strong className={styles.strong}>Cidade:</strong> {data.cidade}</p>
        <p><strong className={styles.strong}>Estado:</strong> {data.estado}</p>
        <p><strong className={styles.strong}>Descrição:</strong> {data.descricao}</p>
    </div>
  )
}

export default Description