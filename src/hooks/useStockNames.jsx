import { useState, useEffect } from 'react'

const useStockNames = () => {
  const [stockMap, setStockMap] = useState(new Map())

  useEffect(() => {
    const fetchStockNames = async () => {
      try {
        const res = await fetch('/complete.json')
        const data = await res.json()

        const namesArray = data.map(item => ({
          name: item.name,
          instrument_key: item.instrument_key
        }))

        const stockLookup = new Map(
          data.map(item => [item.instrument_key, item.name])
        )
        setStockMap(stockLookup)
      } catch (err) {
        console.error('Error loading JSON:', err)
      }
    }

    fetchStockNames()
  }, [])

  const getStockNameById = id => stockMap.get(id) || 'Unknown Stock'

  return { getStockNameById }
}

export default useStockNames
