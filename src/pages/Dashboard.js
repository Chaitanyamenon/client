import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  console.log(userName);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded User:', decodedToken);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setUserName(decodedToken.name);  
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hello, {userName}!</h1>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://www.bing.com/images/create/coding-website-background-minimalist/1-6761e6e41b7a47d6ab16f2ffa4f1a6e2?id=DD%2FN8SXGld9XSatPe2dCwA%3D%3D&view=detailv2&idpp=genimg&thid=OIG3.6qxl2rNOgjJL1zWXIlVY&skey=lBPNW1iIvgs1YnQt9LV6uI60EOZNBfF375VOyWSYK3M&form=GCRIDP&ajaxhist=0&ajaxserp=0)', // Add your background image path here
    backgroundSize: 'cover',  // Make the background cover the whole screen
    backgroundPosition: 'center center', // Center the background
    fontFamily: 'Poppins, sans-serif',
    color: '#4a004e',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#9c27b0',
    fontFamily: 'Sacramento, cursive',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1.1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ab47bc',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    transition: 'background-color 0.3s',
  },
};

export default Dashboard;
