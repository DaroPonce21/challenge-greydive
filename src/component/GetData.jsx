import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase'

function GetData() {
  const [persona, setPersona] = useState([])
  const { id } = useParams()

  console.log("soy el paramas " + id)

  useEffect(() => {
    db.collection("personas").where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());

          setPersona(doc.data());

        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

  }, [id])


  return (
    <div className="row" style={{ marginTop: "3rem" }}>
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <form className='card card-body'>
          <fieldset >
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
                <legend>{persona.full_name}</legend>
                <fieldset className="form-group">
                  <div className='form-group '>
                    <label className="form-label">Email: </label>
                    <input
                      key={persona.email}
                      placeholder={persona.email}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <br />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <div className='form-group '>
                    <label className="form-label">Fecha de Nacimiento: </label>
                    <input
                      key={persona.birth_date}
                      placeholder={persona.birth_date}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <br />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <div className='form-group '>
                    <label className="form-label">País de origen: </label>
                    <input
                      key={persona.country_of_origin}
                      placeholder={persona.country_of_origin}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <br />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <div className='form-group '>
                    <label className="form-label">Acepta los términos y condiciones: </label>
                    <input
                      type='checkbox'
                      style={{marginLeft:"5px"}}
                      key={persona.terms_and_conditions}
                      placeholder={persona.terms_and_conditions}
                      disabled
                      className="form-check-input"
                      checked 
                    />
                  </div>
                  <br />
                </fieldset>
                <br />
              </div>
              <div className="col-md-1"></div>
            </div>

          </fieldset>
        </form>
      </div>
      <div className="col-md-4"></div>
    </div>

  )

}

export default GetData
