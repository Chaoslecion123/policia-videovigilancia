import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import policyImage from '../static/images/privacy-policy.png'
import gear from '../static/images/policia.png'
import AccountContext from "../Context/AccountContext";


const Header = () => {
    const [existSession, setExistSession] = useState(false)

    const context = useContext(AccountContext);
    const name = localStorage.getItem("name");
    const rango = localStorage.getItem("rango")


    const { getSession, logout } = context;

    useEffect(() => {
        getSession()
            .then(session => {
                setExistSession(true)


            })
            .catch(err => {
                console.log('err', err)
                setExistSession(false)
                // window.location.href = "/login"
            })
    }, [])


    useEffect(() => {
        const resultados = localStorage.getItem("results")
        console.log('resultados', JSON.stringify(resultados))
    },[])




    const logOut = () => {
        logout()
            .then(data => {
                console.log("Logged out successfully")
                window.location.href = "/login"
                localStorage.clear()
            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log('getSession', getSession)

    return (
        <>
            <nav className="navbar navbar-expand-lg  nav">
                <div className="container-fluid">
                    <Link to="/">
                        <img src={policyImage} alt="policyImage"  style={{color: "white"}}/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {
                                existSession && <>
                                    <li className="nav-item">
                                        <Link style={{color: "white"}} className="nav-link active" aria-current="page" to="/">Home</Link>
                                    </li>
                                </>
                            }

                            {!existSession && <>
                                <li className="nav-item">
                                    <Link style={{color: "white"}} className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                            </>}

                            {
                                existSession && <>
                                    <li className="nav-item">
                                        <Link style={{color: "white"}} className="nav-link active" aria-current="page" to="/admin">Dashboard</Link>
                                    </li>
                                </>
                            }



                        </ul>
                        {/* <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div> */}

                        {existSession && <>
                            <div className="dropdown btn-group">
                                <img src={gear} className="gear" alt="gear" data-bs-toggle="dropdown" type="button" />
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><button className="dropdown-item" type="button">User info</button></li>
                                    <li><button className="dropdown-item" type="button" onClick={logOut}>Logout</button></li>


                                </ul>
                            </div>
                            <span className="navbar-text" style={{color: "white"}}>Bienvenido, <span className="name-color">{rango} {name}</span></span>
                        </>}

                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header;