import React, { useEffect, useRef } from 'react'
import { createChart, CandlestickSeries, ColorType } from 'lightweight-charts'

const CandlestickChart = ({ candles }) => {
  const chartContainerRef = useRef(null)
  const tooltipRef = useRef(null)

  // const transformData = candles => {
  //   return candles.map(([timestamp, open, high, low, close]) => ({
  //     time: Math.floor(new Date(timestamp).getTime() / 1000),
  //     open,
  //     high,
  //     low,
  //     close
  //   }))
  // }

  const transformData = candles => {
    return candles.map(([timeStamp, open, high, low, close]) => ({
      time: Math.floor(new Date(timeStamp).getTime() / 1000),
      open,
      high,
      low,
      close
    }))
  }

  const data = transformData(candles)
  data.reverse()

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

    newSeries.setData(data)

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    window.addEventListener('resize', handleResize)

    const tooltip = tooltipRef.current
    tooltip.style.zIndex = '10'
    chart.subscribeCrosshairMove(param => {
      if (!param || !param.seriesData || param.seriesData.size === 0) {
        tooltip.style.display = 'none'
        return
      }

      const dataPoint = param.seriesData.get(newSeries)
      if (!dataPoint) return

      const { time, open, high, low, close } = dataPoint
      tooltip.style.display = 'block'
      tooltip.innerHTML = `
        <strong>Time:</strong> ${new Date(time * 1000).toLocaleString()}<br/>
        <strong>Open:</strong> ${open}<br/>
        <strong>High:</strong> ${high}<br/>
        <strong>Low:</strong> ${low}<br/>
        <strong>Close:</strong> ${close}
      `
      tooltip.style.left = `${param.point.x + 10}px`
      tooltip.style.top = `${param.point.y - 10}px`
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [candles])

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={chartContainerRef}
        style={{ position: 'relative', zIndex: '1' }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          display: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          pointerEvents: 'none',
          fontSize: '12px',
          transform: 'translate(-50%, -100%)',
          zIndex: '10'
        }}
      />
    </div>
  )
}

export default CandlestickChart
