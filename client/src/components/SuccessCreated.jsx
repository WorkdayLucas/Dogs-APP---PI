import React from 'react'
import { useHistory } from 'react-router-dom'

function SuccessCreated() {
  const history = useHistory()
  function goTo(dest){
      history.push(`/dogs/${dest}`)
  }
  return (
    <div>
      <h1>Su perro fue creado con exito</h1>
      <button onClick={()=>goTo("create_dogs")}>Crear otro perro</button>
      <button onClick={()=>goTo("home")}>ir a home</button>
    </div>
  )
}

export default SuccessCreated