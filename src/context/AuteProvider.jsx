import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";


//Creo el context
const AuthContext = createContext();

//provider es el que va a rodear toda la app y es de donde vienen los datos
const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                return
                setCargando(false)
            }

            //Config para pasasr bearer Token en jwt
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                // Si el usuario ya esta autenticado lo mando directemente a la pagina de proyectos 
                // para que no tenga que logear de nuevo
                if(data._id && location.pathname === '/') {
                    navigate('/proyectos')
                }
            } catch (error) {
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUuario()
    }, [])

    const cerrarSesionAuth = ()=> {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext
