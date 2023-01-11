import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase'

function GetData() {
  const [persona , setPersona] = useState([])
  const { id } = useParams()

  console.log("soy el paramas " + id)

  useEffect(() =>{
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
    <div>
    <h1>{persona.id}</h1>
     <h1>{persona.full_name}</h1>
      <h1>{persona.email}</h1>
    </div>
    )

}

export default GetData
