import React, {useState} from 'react'
import './Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [user,setUser] = useState({
        name:"test",username:"test",password:"test"
    });

    let name,value;
    const handleInputs = (e)=>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value})


    }


    const [successMessage, setSuccessMessage] = useState('');
    
    const PostData = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:2000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: user.name,
                username: user.username,
                password: user.password
            })
        });
        const data = await res.json();
        if (res.status === 200) {
            setSuccessMessage(data.message);
        } else {
            console.error('Error:', data.error);
        }
    };




  return (
    <>
        <div id='main'>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name:</label> */}
                        <input type="text" id="name" name="name" placeholder='Your Name' value={user.name}
                        onChange={handleInputs} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="username" name="username" placeholder='Your Username' value={user.username}
                        onChange={handleInputs} required/>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" placeholder='Your Password' value={user.password}
                        onChange={handleInputs} required/>
                    </div>
                    <button type="submit" onClick={PostData}>Sign Up</button>
                    <Link to="/login" ><button style={{marginLeft:"21px"}}>Login</button></Link>
                </form>
                <div>
                    <p>For testing purpose:</p>
                    <p>username: test |
                    password: test</p>
                </div>

                {successMessage && (
                <div className='successMessage'>
                    <p>{successMessage}</p>
                </div>
            )}
            </div>
            
            
            
        </div>
    </>
  )
}

export default Signup