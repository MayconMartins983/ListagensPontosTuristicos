import React, { useState } from 'react';
import styles from './register.module.css';
import {Link} from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [selectFields, SetSelectFields] = useState({
        name:'',
        endereco:'',
        estado:'',
        cidade:'',
        descricao:'',
    })

    const handleChange = (event) => {
        const {name,value} = event.target
        SetSelectFields({
            ...selectFields, [name]:value
            
        })
    }

    const [data, setData] = useState('')
    const createPontoTuristico = async () => {
        delete selectFields.id;        
        await axios.post('https://localhost:44371/api/pontosturisticos', selectFields)
        .then((response)=> {
            setData(data.concat(response.data))    
        }).catch((error) => {
            console.log(error)
        })  
    } 


  return (    
    <div className={styles.register}>
        
        <div className={styles.title}>
            <h1 >Cadastro de pontos turísticos</h1>
        </div>

        <form className={styles.form} id='form'> 
            
            <label 
                htmlFor='name' 
                className={styles.label}>
                Nome do Ponto turístico: 
            </label>

            <input type='text'
                className={styles.inputs}
                name='name' 
                id='name'
                onChange={handleChange}
            />  
         
            <label  
                htmlFor='endereco'>
                Localização/ Referência do ponto turístico: 
            </label>

            <input  
                id='endereco' 
                type='text'
                name='endereco'  
                className={styles.inputs}
                onChange={handleChange}
            />
                            
            <label  
                >
                Estado: 
            </label>
            {<select  name='estado' className={styles.inputs}  onChange= {handleChange} value={selectFields.estado}>
                <option value=''>Selecione um Estado</option>                    
                <option value='AC'>AC</option>                    
                <option value='AL'>AL</option>                    
                <option value='AP'>AP</option>                    
                <option value='AM'>AM</option>                    
                <option value='BA'>BA</option>                    
                <option value='CE'>CE</option>                    
                <option value='DF'>DF</option>                    
                <option value='ES'>ES</option>                    
                <option value='GO'>GO</option>                    
                <option value='MA'>MA</option>                    
                <option value='MT'>MT</option>                    
                <option value='MS'>MS</option>                    
                <option value='MG'>MG</option>                    
                <option value='PA'>PA</option>                    
                <option value='PB'>PB</option>                    
                <option value='PR'>PR</option>                    
                <option value='PE'>PE</option>                    
                <option value='PI'>PI</option>                    
                <option value='RJ'>RJ</option>                    
                <option value='RN'>RN</option>                    
                <option value='RS'>RS</option>                    
                <option value='RO'>RO</option>                    
                <option value='RR'>RR</option>                    
                <option value='SC'>SC</option>                    
                <option value='SP'>SP</option>                    
                <option value='SE'>SE</option>                    
                <option value='TO'>TO</option>                    
            </select>   }   
                                
            <label  
                htmlFor='cidade'>
                Cidade: 
            </label>

            <input 
                id='cidade' 
                type='text'
                name='cidade'  
                className={styles.inputs}
                onChange={handleChange}

            />
                
            <label  
                htmlFor='descricao'>
                Descrição do Ponto turístico: (max-100 caracteres)
            </label>

            <textarea 
                id='descricao'
                name='descricao'  
                maxLength={100}
                onChange={handleChange}
            />
                    
            <div>
                <Link to='/'><button className={styles.buttonRegister}>Voltar</button></Link>    
                <button className={styles.buttonRegister} onClick={()=> createPontoTuristico()}>Cadastrar</button>      
            </div>     
        </form>

    </div>
   
  )
}

export default Register