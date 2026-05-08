import { createContext, useContext, useState } from 'react'

const PartsContext = createContext()

export const PartsProvider = ({ children }) => {
  const [selectedParts, setSelectedParts] = useState([])

  const addPart = (part) => {
    if (!selectedParts.find(p => p._id === part._id)) {
      setSelectedParts([...selectedParts, part])
    }
  }

  const removePart = (id) => {
    setSelectedParts(selectedParts.filter(p => p._id !== id))
  }

  const clearParts = () => setSelectedParts([])

  return (
    <PartsContext.Provider value={{ selectedParts, addPart, removePart, clearParts }}>
      {children}
    </PartsContext.Provider>
  )
}

export const useParts = () => useContext(PartsContext)