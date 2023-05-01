import React, {useState} from 'react'

const Serach = ({onSearch}) => {
    const [query, setQuery] = useState("")

    const handleClear = () => {
        setQuery('')
        onSearch('')
      }

    return (
        <div className="search">
            <label htmlFor="query">Buscar</label>
            <input value={query} type="text" name="query" id="query" onChange={(evt) => setQuery(evt.target.value)} />
            <button onClick={handleClear}>Limpar</button>
            <button onClick={() => onSearch(query)}>Procurar</button>
        </div>
    )
}

export default Serach