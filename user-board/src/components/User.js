import React from 'react'

function User({ details }) {
  if (!details) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }

  return (
    <div className='account container'>
      <h3>{details.first_name} {details.last_name}</h3>
      <p>Contact: {details.email}</p>
    </div>
  )
}

export default User
