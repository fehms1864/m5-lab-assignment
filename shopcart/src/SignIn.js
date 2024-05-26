import React, { useState, useEffect } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function SignIn() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  useEffect(() => {console.log(login)},[login])

  const responseFacebook = (response) => {
    console.log(response);
    if (response.status !== 'unknown') {
      setData(response);
      setPicture(response.picture.data.url);
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  return (
    <div className="container">
     <Card className='mt-5'>
      <Card.Header className='pb-4'>
        <h1>Sign In</h1>
      </Card.Header>
        <Card.Body>
          <Card.Text>
            {!login &&
            <React.Fragment>
            <h3>Please login using one of the following:</h3>
            {/* Login Form */}
            <LoginForm />
            {/* FB login button */}
            <FacebookLogin 
            className='d-block'
            appId='1712638002999928'
            autoLoad={false}
            fields='name,email,picture'
            scope='public_profile'
            callback={responseFacebook}
            icon="fa-facebook"
            style={{
                backgroundColor: '#3b5998',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            />
            </React.Fragment>
            }

            {
              login && <Home fbpic={picture} fbdata={data} />
            }
            
          </Card.Text>
        </Card.Body>
     </Card>
    </div>
  );
}

function LoginForm() {
  return (
    <form className='border d-inline-block mt-3 mb-4 p-3 bg-white'>
      <label className='d-flex my-2'>Name:</label>
      <input className='d-flex' type='text' name='name' placeholder='Your name' />
      <label className='d-flex my-2'>Email:</label>
      <input className='d-flex' type='email' name='email' placeholder='Your Email' />
      <input type='submit' value="Login" className='btn bg-success text-white my-3'/>
    </form>
  )
}

function Home ({fbpic,fbdata}) {
  return(
    <React.Fragment>
      <img src={fbpic} alt={fbdata.name} />
      <h3 className='d-inline text-success mx-2'>
        Welcome Back {fbdata.name}!
      </h3>
      <p className='my-5'>Time to checkout?</p>
    </React.Fragment>
  )
}

export default SignIn;
