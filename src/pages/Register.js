import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/login')
    }
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>REGISTER</h1>
        <form onSubmit={registerUser} style={styles.form}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            style={styles.input}
          /><br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            style={styles.input}
          /><br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            style={styles.input}
          /><br />
          <input type="submit" value="Register" style={styles.button} />
        </form>
      </div>
    </div>
  )
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://www.bing.com/images/create/coding-website-background-minimalist/1-6761e6e41b7a47d6ab16f2ffa4f1a6e2?id=DD%2FN8SXGld9XSatPe2dCwA%3D%3D&view=detailv2&idpp=genimg&thid=OIG3.6qxl2rNOgjJL1zWXIlVY&skey=lBPNW1iIvgs1YnQt9LV6uI60EOZNBfF375VOyWSYK3M&form=GCRIDP&ajaxhist=0&ajaxserp=0")', // Ensure URL is wrapped correctly
    backgroundSize: 'cover', // Ensures the background covers the full screen
    backgroundPosition: 'center', // Keeps the background centered
    fontFamily: 'Poppins, sans-serif',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight opacity to make form more readable
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#9c27b0',
    fontFamily: 'Sacramento, cursive', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  input: {
    padding: '12px',
    fontSize: '1.1rem',
    borderRadius: '5px',
    border: '1px solid #ba68c8',
    backgroundColor: '#f3e5f5', 
    fontFamily: 'Poppins, sans-serif',
  },
  button: {
    padding: '12px',
    fontSize: '1.1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ab47bc', 
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
}

export default App

