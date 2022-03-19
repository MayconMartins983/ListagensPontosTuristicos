import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './description.module.css';
import {useEffect, useState } from 'react';
import axios from 'axios';

const Description = () => {
  const [data, setData] = useState(null)
  const {id} = useParams()

  const fetchDataByID = async () => {
    await axios.get(`https://localhost:44371/api/pontosturisticos/${id}`)
    .then((response)=> {
      setData(response.data)    
    })
}

  const [secondData, setSecondData] = useState(null)

  const fetchSecondApi =  async () => {
    await axios.get(`https://localhost:44371/api/pontosturisticos`)
    .then((response)=> {
      setSecondData(response.data) 
         
    })}
    
  

  useEffect(()=> {
    fetchDataByID()
    fetchSecondApi()
  },[])

  if (data === null) return null
  if(secondData == null) return null

  return (
    <div className={styles.conteiner}>
        <div>
          <h1>{data.name}</h1>
          <p>Endereço: {data.endereco}</p>
          <p>Cidade: {data.cidade}</p>
          <p>Estado: {data.estado}</p>
          <p>Descrição: {data.descricao}</p>
        </div>

        <div>
          <button className={styles.buttons}>Editar Postagem</button>
          <button className={styles.buttons}>Excluir Postagem</button>
        </div>
    </div>
  )
}

export default Description