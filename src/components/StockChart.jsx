import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar
} from 'recharts'

export default function StockChart () {
  const { id } = useParams()
  console.log('Stock Name:', id)
  const instrument = id || 'NSE_EQ%7CINE615H01020'
  const [chartType, setChartType] = useState('line')
  const [timeframe, setTimeframe] = useState({ label: '1minute', days: 7 })
  const [stockData, setStockData] = useState([])
  const [profitLoss, setProfitLoss] = useState(null)
  const [loader, setLoader] = useState(true)
  const [errorInfo, setErrorInfo] = useState()

  useEffect(() => {
    fetchStockData()
  }, [timeframe, instrument])

  async function fetchStockData () {
    const today = new Date().toISOString().split('T')[0]
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - timeframe.days)
    const formattedStartDate = startDate.toISOString().split('T')[0]
    // if (!id) return
    try {
      const response = await fetch(
        `https://api.upstox.com/v2/historical-candle/${instrument}/${timeframe.label}/${today}/${formattedStartDate}`,
        {
          headers: { Accept: 'application/json' }
        }
      )
      const data = await response.json()
      console.log('API Response:', data)
      if (data.status === 'success' && data.data && data.data.candles) {
        const formattedData = data.data.candles
          .map(candle => ({
            time: new Date(candle[0]).toLocaleDateString(),
            close: candle[4]
          }))
          .reverse()
        setStockData(formattedData)

        if (formattedData.length > 1) {
          const firstPrice = formattedData[0].close
          const lastPrice = formattedData[formattedData.length - 1].close
          const percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100
          setProfitLoss(percentageChange.toFixed(2)) // Keep 2 decimal places
        } else {
          setProfitLoss(null)
        }
      } else {
        console.error('API error response:', data)
        setErrorInfo(data.errors?.[0]?.message || 'An error occurred')
      }

      setLoader(false)
    } catch (error) {
      console.error('Error fetching stock data:', error)
      setErrorInfo(error.errors?.[0]?.message || 'An error occurred')
      setLoader(false)
    }
  }
  const timeframes = [
    { name: 'Today', label: '1minute', days: 1 },
    { name: '1 Week', label: '1minute', days: 7 },
    { name: '1 Month', label: '30minute', days: 30 },
    { name: '6 Months', label: 'day', days: 180 },
    { name: '1 Year', label: 'week', days: 365 },
    { name: '5 Years', label: 'week', days: 1825 }
  ]

  const lineColor = profitLoss >= 0 ? '#00ff00' : '#ff4444'
  console.log('nigga ', errorInfo)

  if (errorInfo) {
    return (
      <>
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#09090B]'>
          <div className='relative flex flex-col items-center bg-[#09090B] p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto text-white'>
            {errorInfo}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#09090B]'>
      <div className='relative flex flex-col items-center bg-[#09090B] p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto'>
        {loader ? (
          <>loading</>
        ) : (
          <>
            <h2 className='text-[#C0B283] text-2xl font-semibold mb-4'>
              {profitLoss !== null && (
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-lg font-semibold flex items-center justify-center ${
                    profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                  } text-sm sm:text-base md:text-lg`}
                  style={{ maxWidth: '150px', wordBreak: 'break-word' }}
                >
                  {profitLoss >= 0 ? `📈 +${profitLoss}%` : `📉 ${profitLoss}%`}
                </div>
              )}
            </h2>

            <div className='w-full h-[300px]'>
              <ResponsiveContainer>
                {chartType === 'line' ? (
                  <LineChart
                    data={stockData}
                    margin={{ top: 10, right: 10, left: -5, bottom: 5 }}
                  >
                    <XAxis
                      dataKey='time'
                      stroke='#999999'
                      tick={{ fontSize: 10, fill: '#dddddd' }}
                      tickLine={false}
                    />

                    <YAxis
                      stroke='#999999'
                      tick={{ fontSize: 10, fill: '#dddddd' }}
                      tickLine={false}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#2a2a2a',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff'
                      }}
                      labelStyle={{ color: '#C0B283' }}
                    />
                    <Line
                      type='monotone'
                      dataKey='close'
                      stroke={lineColor} // Dynamic line color
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                ) : (
                  <ComposedChart
                    data={stockData}
                    margin={{ top: 10, right: 10, left: -5, bottom: 5 }}
                  >
                    <XAxis
                      dataKey='time'
                      stroke='#999999'
                      tick={{ fill: '#dddddd' }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke='#999999'
                      tick={{ fill: '#dddddd' }}
                      tickLine={false}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#2a2a2a',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff'
                      }}
                      labelStyle={{ color: '#C0B283' }}
                    />
                    <Bar dataKey='close' fill={lineColor} barSize={3} />
                  </ComposedChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className='flex flex-wrap gap-2 mt-4'>
              {timeframes.map(tf => (
                <button
                  key={tf.name}
                  className={`px-3 py-1 rounded-lg text-white bg-gray-800 hover:bg-gray-700 ${
                    timeframe.label === tf.label && timeframe.days === tf.days
                      ? 'opacity-75'
                      : ''
                  }`}
                  onClick={() =>
                    setTimeframe({ label: tf.label, days: tf.days })
                  }
                >
                  {tf.name}
                </button>
              ))}
            </div>

            <div className='flex flex-row gap-4 mt-4'>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition bg-gray-800 hover:bg-gray-700 text-white ${
                  chartType === 'line' ? 'opacity-75' : ''
                }`}
                onClick={() => setChartType('line')}
              >
                Line Chart
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition bg-gray-800 hover:bg-gray-700 text-white ${
                  chartType === 'bar' ? 'opacity-75' : ''
                }`}
                onClick={() => setChartType('bar')}
              >
                Bar Chart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
