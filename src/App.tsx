import { useState } from 'react'
import './App.css'

function App() {
  const [names, setNames] = useState<string[]>([])
  const [functions, setFunctions] = useState<string[]>([])
  const [assignments, setAssignments] = useState<{ [key: string]: string }>({})
  const [newName, setNewName] = useState('')
  const [newFunction, setNewFunction] = useState('')

  const addName = () => {
    if (newName.trim()) {
      setNames([...names, newName.trim()])
      setNewName('')
    }
  }

  const addFunction = () => {
    if (newFunction.trim()) {
      setFunctions([...functions, newFunction.trim()])
      setNewFunction('')
    }
  }

  const deleteName = (index: number) => {
    const newNames = [...names]
    newNames.splice(index, 1)
    setNames(newNames)
  }

  const deleteFunction = (index: number) => {
    const newFunctions = [...functions]
    newFunctions.splice(index, 1)
    setFunctions(newFunctions)
  }

  const performAssignment = () => {
    if (names.length < functions.length) {
      alert('O número de nomes não pode ser menor que o número de funções!')
      return
    }

    const shuffledNames = [...names].sort(() => Math.random() - 0.5)
    const newAssignments: { [key: string]: string } = {}
    
    functions.forEach((func, index) => {
      newAssignments[func] = shuffledNames[index]
    })

    setAssignments(newAssignments)
  }

  const clearAll = () => {
    setNames([])
    setFunctions([])
    setAssignments({})
  }

  return (
    <div className="container">
      <h1>Sorteio de Funções</h1>
      
      <div className="input-section">
        <div className="input-group">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Digite um nome"
            onKeyPress={(e) => e.key === 'Enter' && addName()}
          />
          <button onClick={addName}>Adicionar Nome</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={newFunction}
            onChange={(e) => setNewFunction(e.target.value)}
            placeholder="Digite uma função"
            onKeyPress={(e) => e.key === 'Enter' && addFunction()}
          />
          <button onClick={addFunction}>Adicionar Função</button>
        </div>
      </div>

      <div className="lists-section">
        <div className="list">
          <h3>Nomes ({names.length})</h3>
          <ul>
            {names.map((name, index) => (
              <li key={index}>
                {name}
                <button className="delete-button" onClick={() => deleteName(index)}>×</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          <h3>Funções ({functions.length})</h3>
          <ul>
            {functions.map((func, index) => (
              <li key={index}>
                {func}
                <button className="delete-button" onClick={() => deleteFunction(index)}>×</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="buttons-section">
        <button 
          onClick={performAssignment}
          disabled={names.length === 0 || functions.length === 0}
          className="primary-button"
        >
          Realizar Sorteio
        </button>
        <button onClick={clearAll} className="secondary-button">
          Limpar Tudo
        </button>
      </div>

      {Object.keys(assignments).length > 0 && (
        <div className="results-section">
          <h2>Resultados do Sorteio</h2>
          <div className="assignments-grid">
            {Object.entries(assignments).map(([func, name]) => (
              <div key={func} className="assignment-card">
                <h4>{func}</h4>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
