import React, { useContext, useEffect } from "react";
import AccountContext from "../Context/AccountContext";
import { useNavigate } from "react-router-dom";
import escudoPolicia from '../static/images/escudo.png'


const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    let history = useNavigate();

    const { authenticate, getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log('session', session)

            })
            .catch(err => {
                console.log('err', err)
            })
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('email', email)
        console.log('password', password)
        authenticate(email, password)
            .then(data => {
                console.log('Login success', data)
                // history("/admin")
                window.location.href = "/"



            }).catch(err => {
                console.log('Error login', err.message)
            })
    }

    return (
        <>
            <div className="col-md-4  my-4 margin">
                <form className="my-3" id="login-form">
                    <div className="container__login">
                        <img src={escudoPolicia} />
                        <div>
                        <h3 className="text-center">Login</h3>

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Correo</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                                <h6 className="mt-2">¿olvidaste tu contraseña?  </h6>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Ingresar</button>

                        </div>
                    </div>


                </form>
            </div>
        </>

    )
}

export default Login;