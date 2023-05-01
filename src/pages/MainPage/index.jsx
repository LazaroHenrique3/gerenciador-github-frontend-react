import React, { useState, useEffect, useContext } from 'react'
import {Link} from "react-router-dom"

import { AuthContext } from '../../context/auth'

import Nav from './Nav'
import Repositories from './Repositories'
import Search from './Search'

import { getRepositories, createRepository, destroyRepository} from '../../Services/api'

import "./styles.css"


const MainPage = () => {
  const {user, logout} = useContext(AuthContext)
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingError, setLoadingError] = useState(false)

  const loadData = async (query = '') => {
    try {
      setLoading(true)
      const response = await getRepositories(user?.id, query)
      setRepositories(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoadingError(true)
    }
  }

  useEffect(() => {
    (async () => await loadData())()
  }, [])

  const handleLogout = () => {
    logout()
  }

  const handleSearch = (query) => {
    loadData(query)
  }

  const handleDeleteRepo = async (repository) => {
    const isDelete = window.confirm(`Tem certeza de deseja deletar o repositório "${repository.name}"?`)

    if(!isDelete){
      return
    }

    await destroyRepository(user?.id, repository._id)
    await loadData()
  }

  const handleNewRepo = async (url) => {
    try {
      await createRepository(user?.id, url)
      await loadData()
    } catch (error) {
      console.error(error)
      setLoadingError(true)
    }
  }

  if(loadingError){
    return(
      <div className="loading">
        Erro ao carregar os dados de repositório. <Link to="/">Voltar</Link>
      </div>
    )
  }

  if(loading){
    return(
      <div className="loading">
        Carregando...
      </div>
    )
  }

  return (
    <div id="main">
      <Nav onLogout={handleLogout} />
      <Search onSearch={handleSearch} />
      <Repositories repositories={repositories} onDeleteRepo={handleDeleteRepo} onNewRepo={handleNewRepo} />
    </div>
  )
}

export default MainPage