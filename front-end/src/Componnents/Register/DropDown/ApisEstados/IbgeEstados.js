import React from 'react';

export const IbgeEstados = async () => {
    const url = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados'
    const api = await fetch(url)
    const apiData = api.then(response => response.json())
  return apiData 
   
  
}

