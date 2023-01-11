import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import * as uuid from 'uuid'
import { useNavigate } from 'react-router-dom'


function PostData() {


    const [data, setData] = useState([])
    const getData = () => {
        fetch('/data.json'
            , {
                headers: {
                    "Content-Type": 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                setData(myJson.items)
            })
    }

    useEffect(() => {
        getData()
    }, [])


    const initialStateValues = {
        full_name: '',
        email: '',
        birth_date: '',
        country_of_origin: '',
        terms_and_conditions: "",
        id: "",
    }
    const [info, setInfo] = useState(initialStateValues)

    const handleInputChange = e => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value, id: uuid.v4() })
    }

    function handleSubmit(e) {
        e.preventDefault()
        addInfoDb(info)
    }
    const addInfoDb = async (e) => {
        await db.collection('personas').doc().set(e)
        Notify(e.id)
    }

    const navigate = useNavigate()
    const Notify = (id) => {
       alert('Los Datos fueron cargados con el ID ' + `${id}` + ' Para checkearlos pulsar ACEPTAR') 
            navigate('/datos/' + id);

    }
    
    return (
        <div className="row" style={{marginTop: "3rem"}}>
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <form onSubmit={e => handleSubmit(e)} className='card card-body'>
            <fieldset >
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <legend>Complete sus datos</legend>
                {
                    data &&
                    data.length > 0 &&
                    data.map((item) =>
                        item.type === "select" ?
                            <fieldset className="form-group">
                                <div className="form-group">
                                    <label className="form-label">{item.label}</label>
                                    <select
                                        placeholder={item.name}
                                        key={item.name}
                                        required={item.required}
                                        className='form-control'
                                        name={item.name}
                                        onChange={handleInputChange}
                                    >
                                        <option
                                            key={0}
                                            value='no select'
                                        >{item.label}</option>
                                        {item.options.map((e) =>
                                            <option
                                                value={e.value}>
                                                {e.label}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <br/>
                            </fieldset>
                            :
                            item.type === 'submit' ?
                                <fieldset className="form-group">
                                    <div className='form-group'>
                                        <button
                                            type={item.type}
                                            className='btn btn-success'
                                            style={{width:"100%", maxWidth:"500px"}}
                                        >
                                            {item.label}
                                        </button>
                                    </div>
                                    
                                </fieldset>

                                :
                                item.type === 'checkbox' ?
                                    <fieldset className="form-group">
                                        <div className='form-group'>
                                            <label className="form-label">{item.label}</label>
                                            <input
                                                name={item.name}
                                                type={item.type}
                                                required={item.required}
                                                className="form-check-input"
                                                onChange={handleInputChange}
                                                style={{marginLeft:"5px"}}
                                            />
                                        </div>
                                    </fieldset>
                                    :
                                    <fieldset className="form-group">
                                        <div className='form-group '>
                                            <label className="form-label">{item.label}</label>
                                            <input
                                                key={item.name}
                                                placeholder={item.label}
                                                name={item.name}
                                                type={item.type}
                                                required={item.required}
                                                className="form-control"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                       
                                        <br/>
                                    </fieldset>
                    )
                }
                <br/>
                
                </div>
                <div className="col-md-1"></div>
            </div>
                
            </fieldset>
        </form>
            </div>
            <div className="col-md-4"></div>
        </div>
        
    );
}

export default PostData