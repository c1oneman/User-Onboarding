import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be 2 chars or longer'),
  email: yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain letters.'),
  terms: yup.bool().oneOf([true], 'Must Agree to Terms')
  ,
})