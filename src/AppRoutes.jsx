import { useContext } from "react"

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"

import { AuthProvider, AuthContext } from "./context/auth"

import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"

const AppRoutes = () => {
    const Private = ({children}) => {
        const {authenticated, loading} = useContext(AuthContext)

         //Se ainda estiver na estapa de loading la na autenticação
        if(loading) {
            return <div className="loading">Carregando...</div>
        }


        //Se não estou autenticado eu volto para o Login
        if(!authenticated){
            return <Navigate to="/"/>
        }

        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/home" element={<Private><MainPage /></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes