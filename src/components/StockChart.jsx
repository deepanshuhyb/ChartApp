import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import useStockNames from '@/hooks/useStockNames'
import loading from '../assets/loader.svg'
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
import CandlestickChart from './CandlestickChart'

export default function StockChart () {
  const { id } = useParams()

  const { getStockNameById } = useStockNames()
  const [candles, setCandles] = useState('')
  console.log('Stock Name:', id)
  const [latestClose, setLatestClose] = useState(null)
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
        setCandles(data.data.candles)
        const formattedData = data.data.candles
          .map(candle => ({
            time: new Date(candle[0]).toLocaleDateString(),
            close: candle[4]
          }))
          .reverse()
        setStockData(formattedData)
        if (formattedData.length > 0) {
          setLatestClose(formattedData[formattedData.length - 1].close)
        } else {
          setLatestClose(null)
        }

        if (formattedData.length > 1) {
          const firstPrice = formattedData[0].close
          const lastPrice = formattedData[formattedData.length - 1].close
          const percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100
          setProfitLoss(percentageChange.toFixed(2))
        } else {
          setProfitLoss(null)
        }

        setErrorInfo('')
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
    { name: '1 Year', label: 'day', days: 365 },
    { name: '5 Years', label: 'week', days: 1825 }
  ]

  const lineColor = profitLoss >= 0 ? '#00ff00' : '#D55438'
  // console.log('nigga ', errorInfo)

  // const xaxis = 'time'
  // console.log(candles)
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
      <div className='relative flex flex-col items-center bg-[#09090B] p-6 pt-0 rounded-lg shadow-xl w-full max-w-7xl mx-auto justify-between'>
        {loader ? (
          <div className='text-white'>
            loading...
            <img src={loading} alt='loading' className='w-12 h-12' />
          </div>
        ) : (
          <>
            <div className='flex text-lg h-32 pt-sans-narrow-regular pt-4 text-white w-screen md:pl-72 md:pt-8 mb-4 relative md:static md:w-full'>
              <h2 className='text-white md:text-2xl font-sans text-xl font-semibold px-4 absolute left-12 top-12 md:static md:w-full'>
                {getStockNameById(id)}
                <div className='flex gap-1'>
                  {latestClose !== null && <div>₹{latestClose}</div>}
                  {profitLoss !== null && (
                    <div
                      className={` font-semibold flex items-center justify-center ${
                        profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                      } text-sm sm:text-base md:text-lg`}
                    >
                      {profitLoss >= 0
                        ? `📈 +${profitLoss}%`
                        : `📉 ${profitLoss}%`}
                    </div>
                  )}
                </div>
              </h2>
            </div>
            <div className='w-full max-w-[800px] h-[350px]'>
              <ResponsiveContainer>
                {chartType === 'line' ? (
                  <LineChart
                    data={stockData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
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
                      // dataKey='auto'
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
                      stroke={lineColor}
                      strokeWidth={2.25}
                      dot={false}
                    />
                  </LineChart>
                ) : (
                  <div className='border-2 w-[850px]  h-[310px] border-white md:block hidden '>
                    <CandlestickChart candles={candles} />
                  </div>

                  // <ComposedChart
                  //   data={stockData}
                  //   margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  // >
                  //   <XAxis
                  //     dataKey='time'
                  //     stroke='#999999'
                  //     tick={{ fill: '#dddddd' }}
                  //     tickLine={false}
                  //   />
                  //   <YAxis
                  //     stroke='#999999'
                  //     tick={{ fill: '#dddddd' }}
                  //     tickLine={false}
                  //     domain={['auto', 'auto']}
                  //   />
                  //   <Tooltip
                  //     contentStyle={{
                  //       backgroundColor: '#2a2a2a',
                  //       borderRadius: '8px',
                  //       border: 'none',
                  //       color: '#fff'
                  //     }}
                  //     labelStyle={{ color: '#C0B283' }}
                  //   />
                  //   <Bar dataKey='close' fill={lineColor} barSize={3} />
                  // </ComposedChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className='justify-center gap-3 flex flex-wrap mt-4'>
              {timeframes.map(tf => (
                <button
                  key={tf.name}
                  className={`px-3 py-1 border-2 rounded-lg text-white hover:bg-gray-700 ${
                    timeframe.label === tf.label && timeframe.days === tf.days
                      ? 'opacity-50'
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

            <div className='flex flex-row gap-4 pt-4 mt-4'>
              <button
                className={`px-4 py-2 rounded-lg border-2 font-semibold transition hover:bg-gray-700 text-white ${
                  chartType === 'line' ? 'opacity-75' : ''
                }`}
                onClick={() => setChartType('line')}
              >
                Line Chart
              </button>
              <button
                className={`px-4 py-2 rounded-lg border-2 font-semibold hidden md:block transition hover:bg-gray-700 text-white ${
                  chartType === 'bar' ? 'opacity-75' : ''
                }`}
                onClick={() => setChartType('candle')}
              >
                Candlestick data
              </button>
            </div>
          </>
        )}

        <div className='text-white'>something</div>
      </div>

      <div className='gap-2 flex items-center'>
        <Checkbox />
        <label
          htmlFor='terms'
          className='text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Want to learn and get insights?
        </label>
        <Button variant='outline'>Yes</Button>
      </div>
      <div className='text-white'>a</div>
    </div>
  )
}
