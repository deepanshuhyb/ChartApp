import React, { useEffect, useRef } from 'react'
import { createChart, CandlestickSeries, ColorType } from 'lightweight-charts'

const CandlestickChart = ({ candles }) => {
  const chartContainerRef = useRef(null)

  const transformData = candles => {
    return candles.map(([timestamp, open, high, low, close]) => ({
      time: Math.floor(new Date(timestamp).getTime() / 1000),
      open,
      high,
      low,
      close
    }))
  }
  // console.log(candles)

  const rawData = [
    ['2025-03-25T15:29:00+05:30', 120, 130, 115, 125, 69636, 0],
    ['2025-03-26T15:30:00+05:30', 125, 135, 120, 130, 50000, 0],
    ['2025-03-27T15:31:00+05:30', 130, 140, 125, 138, 45000, 0],
    ['2025-03-28T15:32:00+05:30', 138, 145, 130, 142, 60000, 0],
    ['2025-03-29T15:33:00+05:30', 142, 148, 138, 145, 55000, 0]
  ]
  const data = transformData(candles)
  data.reverse()
  console.log(data)
  //

  // const newData = transformData(rawData)
  // console.log(newData)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: 'black' },
        textColor: 'white'
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    })

    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderUpColor: '#26a69a',
      borderDownColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    })

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [candles])

  return <div ref={chartContainerRef} />
}

export default CandlestickChart
