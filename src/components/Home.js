import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountContext from "../Context/AccountContext";
import aboutImage from '../static/images/about.jpg'

const Home = () => {
    const navidate = useNavigate()
    const name = localStorage.getItem("name");
    const { authenticate, getSession } = useContext(AccountContext);

    const getUserSesion = async () => {
        const result = getSession().then(res => res).catch(err => err)
        console.log('aqui debe estar', result)
        return result
    }

    useEffect(() => {

        const fetchData = async () => {
            await getSession()


        }

        fetchData()
            .then(res => console.log('listo')).catch(err => {
                console.log('hola', err)
                navidate("/login")
            })


    }, [])

    return (
        <>

            <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.3s" src={aboutImage} style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="mb-4">
                                <h5 className="text-uppercase" style={{ letterSpacing: '5px', color: 'green' }}>Acerca de nosotros</h5>
                                <h1 className="display-5 mb-0">Dirección Contra la Corrupción de la Policía Nacional del Perú</h1>
                            </div>
                            <p className="mb-4">La Dirección Contra la Corrupción es el órgano especializado, de carácter técnico y sistémico, normativo y operativo; responsable de prevenir, investigar, combatir y denunciar bajo la conducción jurídica del fiscal especializado, los delitos contra la administración pública y conexos, cometidos por funcionarios o servidores públicos y particulares en agravio del Estado, en el marco de la normativa legal sobre la materia. Tiene competencia a nivel nacional.</p>
                            <div className="row g-3">
                                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                                    <div className="d-flex flex-column justify-content-center text-center border-bottom border-5 border-secondary rounded p-3" style={{ height: '200px', backgroundColor: 'green' }}>
                                        <i className="fa fa-star fa-4x text-white mb-4"></i>
                                        <h4 className="text-white mb-0">35 años protegiendo a los ciudadanos</h4>
                                    </div>
                                </div>
                                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.9s">
                                    <div className="bg-secondary d-flex flex-column justify-content-center text-center border-bottom border-5 border-primary rounded p-3" style={{ height: '200px' }}>
                                        <i className="fa fa-award fa-4x text-white mb-4"></i>
                                        <h4 className="text-white mb-0">Award Winning</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;