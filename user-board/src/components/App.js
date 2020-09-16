// forgot to branch
import React, { useState, useEffect } from 'react'
import './App.css';
import Form from './form.js';
import User from './User.js'
import schema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}
const initialDisabled = true

const initialUsers = []
function App() {
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled) 
  const [users, setUsers] = useState(initialUsers) 

  const getAccounts = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        const users = res.data.data
        console.log(users)
        setUsers(users)

      })
      .catch(err => {
        debugger
        console.log(err)
      })
  }

  useEffect(() => {
    getAccounts()
  }, [])
  useEffect(() => {

    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])
  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }
  const newUser = newUser => {
  
    setUsers([...users, newUser]) 
    setFormValues(initialFormValues)

  }
  const validate = (name, value) => {

    yup
      .reach(schema, name)

      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => { // eslint-disable-line
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }
  const formSubmit = () => {
    const newFriend = {
      first_name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    newUser(newFriend)
  }
  return (
    <div className="App">
      <h1>Users</h1>
      <Form 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        />
       {
       
        users.map(user => {
          return (
          <User key={`USER:${user.id},${user.email}`} details={user} />
        )
        
      })
    }
    </div>
   
  );
}

export default App;
