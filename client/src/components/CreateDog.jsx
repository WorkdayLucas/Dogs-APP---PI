import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import './CreateDog.css'
import { useHistory } from 'react-router-dom';
import dogCreateImg from '../images/dog_create.png'


function CreateDog() {

  const history = useHistory()
  const tempers = useSelector(state => state.tempers)
  const [heights, setHeights] = useState({
    min: "",
    max: ""
  })
  const [weights, setWeights] = useState({
    min: "",
    max: ""
  })
  const [years, setYears] = useState({
    min: "",
    max: ""
  })
  const [dog, setDog] = useState({
    name: "",
    height: " - ",
    weight: " - ",
    lifeSpan: " - ",
    tempers: [],
    img: ""

  })
  const [limitMsg, setLimitMsg] = useState({
    nameMsg: "",
    temperMsg: ""
  })

  const [err, setErr] = useState({
    nameErr: "Este campo debe estar completo.",
    heightMinErr: "Este campo debe esta completo.",
    weightsMinErr: "Este campo debe esta completo.",
    yearsMinErr: "Este campo debe esta completo.",
    heightMaxErr: "Este campo debe esta completo.",
    weightsMaxErr: "Este campo debe esta completo.",
    yearsMaxErr: "Este campo debe esta completo.",
    tempersErr: "Debe tener al menos 3 temperamentos",
    imgErr: "Este campo debe estar completo"
  })

  async function createDog(dog, setHeights) {
    const createdDog = await axios.post(`http://localhost:3001/API/dog`, dog)
    if (createdDog.data.msg.includes("Ya existe la raza")) {
      alert(createdDog.data.msg)
    } else {
      history.push("/dogs/create_dogs/Success")
    }
  }

  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        if (e.target.value.length > 40) {
          setLimitMsg({ ...limitMsg, nameMsg: "maximo 40 caracteres" })
        } else {
          setDog({
            ...dog, name: e.target.value.length === 1 && e.target.value[0] === " " ?
              "" : e.target.value.length > 1 && (e.target.value[0] === " " || e.target.value[0] !== " ") ?
                e.target.value.trim()[0].toUpperCase() + e.target.value.trim().substring(1).trim() : e.target.value.length === 1 && e.target.value[0] !== " " ?
                  e.target.value.toUpperCase() : e.target.value

          })
        }
        break
      case "heightMin":
        if (e.target.value > 150) {
          setHeights({
            ...heights, min: 150
          })
        } else {
          setHeights({
            ...heights, min: e.target.value.length === 1 && e.target.value[0] === " " ?
              "" : e.target.value.length > 1 && e.target.value[0] === " " ?
                e.target.value.trim() : e.target.value
          })
        }
        break
      case "heightMax":
        if (e.target.value > 150) {
          setHeights({
            ...heights, max: 150
          })
        } else {
          setHeights({
            ...heights, max: e.target.value.length === 1 && e.target.value[0] === " " ?
              "" : e.target.value.length > 1 && e.target.value[0] === " " ?
                e.target.value.trim() : e.target.value
          })
        }
        break
      case "weightMin":
        if (e.target.value > 500) {
          setWeights({
            ...weights, min: 500
          })
        } else {
          setWeights({
            ...weights, min: e.target.value.length === 1 && e.target.value[0] === " " ?
              "" : e.target.value.length > 1 && e.target.value[0] === " " ?
                e.target.value.trim() : e.target.value
          })
        }
        break
      case "weightMax":
        if (e.target.value > 500) {
          setWeights({
            ...weights, max: 500
          })
        } else {
          setWeights({
            ...weights, max: e.target.value.length === 1 && e.target.value[0] === " " ?
              "" : e.target.value.length > 1 && e.target.value[0] === " " ?
                e.target.value.trim() : e.target.value
          })
        }
        break
      case "LifeMin":
        if (e.target.value > 50) {
          setYears({
            ...years, min: 50
          })
        } else {
          setYears({
            ...years, min: e.target.value.length === 1 && e.target.value[0] === " " ?
              "" : e.target.value.length > 1 && e.target.value[0] === " " ?
                e.target.value.trim() : e.target.value
          })
        }
        break
      case "LifeMax":
        if (e.target.value > 50) {
          setYears({
            ...years, max: 50
          })
        } else {
          setYears({
            ...years, max: e.target.value.length === 1 && e.target.value[0] === " " ?
              "" : e.target.value.length > 1 && e.target.value[0] === " " ?
                e.target.value.trim() : e.target.value
          })
        }
        break
      case "img":
        setDog({ ...dog, img: e.target.value })
        break
      default:
        console.log("no valido")
    }
  }

  function selectChange(e) {
    if (dog.tempers.includes(e.target.value)) {
      let filt = dog.tempers.filter(t => t !== e.target.value)
      setDog({ ...dog, tempers: filt })
    } else {
      if (dog.tempers.length < 10) {
        console.log(dog.tempers.length)
        setDog({ ...dog, tempers: [...dog.tempers, e.target.value] })
      } else {
        setLimitMsg({ ...limitMsg, temperMsg: "10 temperamentos como maximo" })
      }
    }
  }

  useEffect(() => {
    if (dog.name !== "") {
      setErr({ ...err, nameErr: "" })
    } else if (dog.name === "") {
      setErr({ ...err, nameErr: "Este campo debe esta completo." })
    }
  }, [dog])

  useEffect(() => {
    if (dog.img === "") {
      setErr({ ...err, imgErr: "Este campo debe esta completo." })
    } else if (dog.img !== "") {
      if (!(/\.(jpg|png|gif)$/i).test(dog.img)) {
        setErr({ ...err, imgErr: "Url no contiene un archivo valido" })
      } else {
        setErr({ ...err, imgErr: "" })
      }

    }
  }, [dog.img])

  useEffect(() => {
    if (dog.tempers.length >= 3) {
      setErr({ ...err, tempersErr: "" })
    } else {
      setErr({ ...err, tempersErr: "Debe tener al menos 3 temperamentos" })
    }
  }, [dog.tempers])

  useEffect(() => {
    if (heights.min !== "") {
      if (isNaN(Number(heights.min))) {
        setErr({ ...err, heightMinErr: "El dato debe ser un numero." })
      } else if (heights.max !== "" && Number(heights.min) >= Number(heights.max)) {
        setErr({ ...err, heightMinErr: "El min debe ser menor al max" })
      } else {
        if (err.heightMaxErr === "El max deber ser mayor al min") {
          setErr({ ...err, heightMaxErr: "", heightMinErr: "" })
        } else {
          setErr({ ...err, heightMinErr: "" })
        }

      }
    } else if (heights.min === "") {
      setErr({ ...err, heightMinErr: "Este campo debe esta completo." })
    }
    setDog({ ...dog, height: heights.min + " - " + heights.max })
  }, [heights])

  useEffect(() => {
    if (heights.max !== "") {
      if (isNaN(Number(heights.max))) {
        setErr({ ...err, heightMaxErr: "El dato debe ser un numero." })
      } else if (heights.min !== "" && Number(heights.min) >= Number(heights.max)) {
        setErr({ ...err, heightMaxErr: "El max deber ser mayor al min" })
      } else {
        if (err.heightMinErr === "El min debe ser menor al max") {
          setErr({ ...err, heightMaxErr: "", heightMinErr: "" })
        } else {
          setErr({ ...err, heightMaxErr: "" })
        }

      }
    } else if (heights.max === "") {
      setErr({ ...err, heightMaxErr: "Este campo debe esta completo." })
    }
  }, [heights.max])

  useEffect(() => {
    if (weights.min !== "") {
      if (isNaN(Number(weights.min))) {
        setErr({ ...err, weightsMinErr: "El dato debe ser un numero." })
      } else if (weights.max !== "" && Number(weights.min) >= Number(weights.max)) {
        setErr({ ...err, weightsMinErr: "El min debe ser menor al max" })
      } else {
        if (err.weightsMaxErr === "El max deber ser mayor al min") {
          setErr({ ...err, weightsMaxErr: "", weightsMinErr: "" })
        } else {
          setErr({ ...err, weightsMinErr: "" })
        }

      }
    } else if (weights.min === "") {
      setErr({ ...err, weightsMinErr: "Este campo debe esta completo." })
    }
    setDog({ ...dog, weight: weights.min + " - " + weights.max })
  }, [weights])

  useEffect(() => {
    if (weights.max !== "") {
      if (isNaN(Number(weights.max))) {
        setErr({ ...err, weightsMaxErr: "El dato debe ser un numero." })
      } else if (weights.min !== "" && Number(weights.min) >= Number(weights.max)) {
        setErr({ ...err, weightsMaxErr: "El max deber ser mayor al min" })
      } else {
        if (err.weightsMinErr === "El min debe ser menor al max") {
          setErr({ ...err, weightsMaxErr: "", weightsMinErr: "" })
        } else {
          setErr({ ...err, weightsMaxErr: "" })
        }

      }
    } else if (weights.max === "") {
      setErr({ ...err, weightsMaxErr: "Este campo debe esta completo." })
    }
  }, [weights.max])

  useEffect(() => {
    if (years.min !== "") {
      if (isNaN(Number(years.min))) {
        setErr({ ...err, yearsMinErr: "El dato debe ser un numero." })
      } else if (years.max !== "" && Number(years.min) >= Number(years.max)) {
        setErr({ ...err, yearsMinErr: "El min debe ser menor al max" })
      } else {
        if (err.yearsMaxErr === "El max deber ser mayor al min") {
          setErr({ ...err, yearsMaxErr: "", yearsMinErr: "" })
        } else {
          setErr({ ...err, yearsMinErr: "" })
        }

      }
    } else if (years.min === "") {
      setErr({ ...err, yearsMinErr: "Este campo debe esta completo." })
    }
    setDog({ ...dog, lifeSpan: years.min + " - " + years.max })
  }, [years])

  useEffect(() => {
    if (years.max !== "") {
      if (isNaN(Number(years.max))) {
        setErr({ ...err, yearsMaxErr: "El dato debe ser un numero." })
      } else if (years.min !== "" && Number(years.min) >= Number(years.max)) {
        setErr({ ...err, yearsMaxErr: "El max deber ser mayor al min" })
      } else {
        if (err.yearsMinErr === "El min debe ser menor al max") {
          setErr({ ...err, yearsMaxErr: "", yearsMinErr: "" })
        } else {
          setErr({ ...err, yearsMaxErr: "" })
        }

      }
    } else if (years.max === "") {
      setErr({ ...err, yearsMaxErr: "Este campo debe esta completo." })
    }
  }, [years.max])

  useEffect(() => {
    setTimeout(() => { setLimitMsg({ ...limitMsg, temperMsg: "" }) }, 2000)
  }, [limitMsg.temperMsg])

  useEffect(() => {
    setTimeout(() => { setLimitMsg({ ...limitMsg, nameMsg: "", }) }, 2000)
  }, [limitMsg.nameMsg])

  function errValidator(err, dog, e, setHeights) {
    e.preventDefault()
    if (err.nameErr === "" &&
      err.heightMinErr === "" &&
      err.weightsMinErr === "" &&
      err.yearsMinErr === "" &&
      err.heightMaxErr === "" &&
      err.weightsMaxErr === "" &&
      err.yearsMaxErr === "" &&
      err.tempersErr === "" &&
      err.imgErr === "") {
      createDog(dog, setHeights)
    } else {
      alert("Debe completar todos los campos correctamente para poder crear un perro")
    }
  }

  function onClick() {
    console.log(dog)
    console.log(heights)
  }

  function onClickErr() {
    console.log(err)
  }

  function deletTemper(e) {
    e.preventDefault()
    let temps = dog.tempers.map(e => e)
    temps.pop()
    setDog({ ...dog, tempers: temps })
  }

  return (
    <div className='formContainer'>
      <form className='createForm' onSubmit={(e) => errValidator(err, dog, e, setHeights)}>
        <div className='createSect'>
          <label className="titles">Race</label>
          <div>
            <input className='textInput' type={"hide"} onChange={(e) => handleChange(e)} value={dog.name} name="name" placeholder='race' />
            <div className='speciaErr'>
              <label className={`${err.nameErr ? "errMsg" : "blue"}`} >{err.nameErr ? err.nameErr : limitMsg.nameMsg}</label>
            </div>
          </div>
        </div>

        <div className='createSect'>
          <label className="titles">{"Height(cm)"}</label>
          <div>
            <input className='numInput' type={"text"} onChange={(e) => handleChange(e)} value={heights.min} name="heightMin" placeholder='min' />
            <label className="errMsg" >{err.heightMinErr}</label>
          </div>
          <div>
            <input className='numInput' type={"text"} onChange={(e) => handleChange(e)} value={heights.max} name="heightMax" placeholder='max' />
            <label className="errMsg" >{err.heightMaxErr}</label>
          </div>
        </div>

        <div className='createSect'>
          <label className="titles">{"Weight(lb)"}</label>
          <div>
            <input className='numInput' type={"text"} onChange={(e) => handleChange(e)} value={weights.min} name="weightMin" placeholder='min' />
            <label className="errMsg" >{err.weightsMinErr}</label>
          </div>
          <div>
            <input className='numInput' type={"text"} onChange={(e) => handleChange(e)} value={weights.max} name="weightMax" placeholder='max' />
            <label className="errMsg" >{err.weightsMaxErr}</label>
          </div>
        </div>

        <div className='createSect'>
          <label className="titles">{"Life span(year)"}</label>
          <div>
            <input className='numInput' type={"text"} onChange={(e) => handleChange(e)} value={years.min} name="LifeMin" placeholder='min' />
            <label className="errMsg" >{err.yearsMinErr}</label>
          </div>
          <div>
            <input className='numInput' type={"text"} onChange={(e) => handleChange(e)} value={years.max} name="LifeMax" placeholder='max' />
            <label className="errMsg" >{err.yearsMaxErr}</label>
          </div>
        </div>

        <div className='createSect'>
          <label className="titles">Temperaments</label>
          <div className='temersContainer'>
            <textarea className='tempersArea' value={dog.tempers} readOnly/>
            <div className='speciaErr'>
              <label className={`${limitMsg.temperMsg ? "blue" : "errMsg"}`} >{limitMsg.temperMsg ? limitMsg.temperMsg : err.tempersErr}</label>
            </div>
            <span className='tempers'>
              <select autoFocus="autoFocus" onChange={(e) => selectChange(e)} name="tempers">
                {tempers.map(temper => <option value={temper.name} key={temper.id}>{temper.name}</option>)}
              </select>
              <button onClick={(e) => deletTemper(e)}>Eliminar</button>
            </span>
          </div>
        </div>

        <div className='createSect'>
          <label className="titles">Image</label>
          <div >
            <div className='dogImgForm'>
              <img src={dog.img !== "" && err.imgErr == "" ? dog.img : dogCreateImg} alt='dog' />
            </div>
            <input className='textInput' type={"text"} onChange={(e) => handleChange(e)} value={dog.img} name="img" placeholder='url' />
            <div className='speciaErr'>
              <label className="errMsg" >{err.imgErr}</label>
            </div>
          </div>
        </div>


        <input className={'crear'} type={"submit"} />
      </form>

      <button onClick={onClick}>ver dog</button>
      <button onClick={onClickErr}>ver errores</button>
    </div>

  )
}

export default CreateDog