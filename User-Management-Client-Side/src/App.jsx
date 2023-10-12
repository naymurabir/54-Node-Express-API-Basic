import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const user = { name, email }
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data]
        setUsers(newUsers)
        e.target.reset()
      })
  }

  return (
    <>
      <h2>Users management system.</h2>
      <h3>The number of users: {users.length} </h3>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add user" />
      </form>

      <div>
        {
          users.map(user => <p key={user.id}> {user.id} : {user.name} : {user.email} </p>)
        }
      </div>
    </>
  )
}

export default App
