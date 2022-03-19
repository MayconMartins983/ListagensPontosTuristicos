import React from 'react';
import styles from '../register.module.css'

const dropDownCity = () => {
  return (
    <select className={styles.inputs}>
        <option value=''>Selecione uma cidade</option>                    
    </select>
  )
}

export default dropDownCity