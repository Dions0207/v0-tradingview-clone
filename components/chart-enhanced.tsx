"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  ChevronDown,
  Crosshair,
  Download,
  Eraser,
  Eye,
  Layers,
  LineChart,
  Maximize2,
  Minus,
  Pencil,
  Plus,
  Save,
  Share2,
  Text,
  AlertTriangle,
  Brain,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { AIAnalysisPanel } from "./ai-analysis-panel"
import { IQOptionIntegration } from "./iq-option-integration"
import { TradingStrategy } from "./trading-strategy"
import { DraggablePanel } from "./draggable-panel"

interface ChartDataPoint {
  time: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Definimos los activos disponibles con precios actualizados
const availableAssets = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 110250,
    change: 1.85,
  },
  {
    symbol: "XAUUSD",
    name: "Oro/USD",
    price: 2485.3,
    change: 0.42,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 212.45,
    change: 0.78,
  },
  {
    symbol: "EUR/USD",
    name: "Euro/Dólar",
    price: 1.0865,
    change: -0.12,
  },
]

export function ChartEnhanced() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [timeframe, setTimeframe] = useState("1D")
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [showIQOption, setShowIQOption] = useState(false) // Ocultamos el panel básico de IQ Option
  const [showStrategy, setShowStrategy] = useState(true) // Mostramos la estrategia por defecto
  const [selectedAsset, setSelectedAsset] = useState(availableAssets[0]) // BTC/USD por defecto
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [assetMenuOpen, setAssetMenuOpen] = useState(false)
  const [showEMA, setShowEMA] = useState(true)
  const [showSMA, setShowSMA] = useState(true)
  const [emaLength, setEmaLength] = useState(5)
  const [smaLength, setSmaLength] = useState(8)
  const [emaValues, setEmaValues] = useState<number[]>([])
  const [smaValues, setSmaValues] = useState<number[]>([])

  // Generar datos del gráfico solo cuando cambia el activo o timeframe
  const generateChartData = useCallback(() => {
    const data: ChartDataPoint[] = []
    let date = new Date()
    date.setDate(date.getDate() - 100) // Comenzar 100 días atrás

    // Establecer precio inicial basado en el activo seleccionado
    let price =
      selectedAsset.symbol === "BTC/USD"
        ? 110250 * 0.9
        : selectedAsset.symbol === "XAUUSD"
          ? 2485.3 * 0.9
          : selectedAsset.symbol === "EUR/USD"
            ? 1.0865 * 0.99
            : 212.45 * 0.9

    // Patrón de precio basado en el activo seleccionado
    const volatility =
      selectedAsset.symbol === "BTC/USD"
        ? 0.03
        : selectedAsset.symbol === "XAUUSD"
          ? 0.01
          : selectedAsset.symbol === "EUR/USD"
            ? 0.002
            : 0.015

    // Tendencia general
    const trend = selectedAsset.change > 0 ? 0.002 : -0.001

    for (let i = 0; i < 100; i++) {
      const dayVariation = (Math.random() - 0.5) * volatility * price
      const trendEffect = price * trend
      const open = price
      price = price + dayVariation + trendEffect

      // Crear variación intradiaria
      const high = Math.max(open, price) + Math.random() * volatility * price
      const low = Math.min(open, price) - Math.random() * volatility * price
      const volume = Math.floor(Math.random() * 10000000) + 1000000

      // Avanzar la fecha según el timeframe
      const newDate = new Date(date)
      if (timeframe === "1D") {
        newDate.setDate(date.getDate() + 1)
      } else if (timeframe === "1h") {
        newDate.setHours(date.getHours() + 1)
      } else if (timeframe === "1W") {
        newDate.setDate(date.getDate() + 7)
      }

      data.push({
        time: date,
        open,
        high,
        low,
        close: price,
        volume,
      })

      date = newDate
    }

    return data
  }, [selectedAsset.symbol, selectedAsset.change, timeframe])

  // Calcular medias móviles
  const calculateIndicators = useCallback(
    (data: ChartDataPoint[]) => {
      // Calcular EMA
      const calculateEMA = (data: ChartDataPoint[], length: number) => {
        const k = 2 / (length + 1)
        let ema = data[0].close
        const emaValues = [ema]

        for (let i = 1; i < data.length; i++) {
          ema = data[i].close * k + ema * (1 - k)
          emaValues.push(ema)
        }
        return emaValues
      }

      // Calcular SMA
      const calculateSMA = (data: ChartDataPoint[], length: number) => {
        const smaValues = []
        for (let i = 0; i < data.length; i++) {
          if (i < length - 1) {
            smaValues.push(null)
            continue
          }

          let sum = 0
          for (let j = 0; j < length; j++) {
            sum += data[i - j].close
          }
          smaValues.push(sum / length)
        }
        return smaValues
      }

      const ema = calculateEMA(data, emaLength)
      const sma = calculateSMA(data, smaLength)

      setEmaValues(ema)
      setSmaValues(sma)
    },
    [emaLength, smaLength],
  )

  // Inicializar datos y configurar canvas
  useEffect(() => {
    const data = generateChartData()
    setChartData(data)
    calculateIndicators(data)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el canvas al tamaño del contenedor
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight

      drawChart(ctx, canvas.width, canvas.height, data)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Simular actualización de datos en tiempo real
    const interval = setInterval(() => {
      updateLatestCandle()
    }, 5000)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(interval)
    }
  }, [selectedAsset.symbol, timeframe, generateChartData, calculateIndicators, showEMA, showSMA])

  const updateLatestCandle = useCallback(() => {
    if (chartData.length === 0) return

    const newData = [...chartData]
    const lastCandle = newData[newData.length - 1]

    // Simular cambio de precio
    const priceChange = (Math.random() - 0.48) * 0.005 * lastCandle.close
    const newClose = lastCandle.close + priceChange

    // Actualizar último dato
    newData[newData.length - 1] = {
      ...lastCandle,
      close: newClose,
      high: Math.max(lastCandle.high, newClose),
      low: Math.min(lastCandle.low, newClose),
    }

    setChartData(newData)
    calculateIndicators(newData)

    // Redibujar el gráfico
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawChart(ctx, canvas.width, canvas.height, newData)
  }, [chartData, calculateIndicators])

  // Función para dibujar el gráfico
  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, data: ChartDataPoint[]) => {
      if (data.length === 0) return

      // Limpiar el canvas
      ctx.clearRect(0, 0, width, height)

      // Configuración del gráfico
      const padding = { top: 20, right: 80, bottom: 30, left: 70 }
      const chartWidth = width - padding.left - padding.right
      const chartHeight = height - padding.top - padding.bottom

      // Calcular escalas
      const xScale = chartWidth / data.length
      const minPrice = Math.min(...data.map((d) => d.low)) * 0.995
      const maxPrice = Math.max(...data.map((d) => d.high)) * 1.005
      const priceRange = maxPrice - minPrice

      // Dibujar fondo del gráfico
      ctx.fillStyle = "#f8fafc05"
      ctx.fillRect(padding.left, padding.top, chartWidth, chartHeight)

      // Dibujar grid
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 0.5

      // Eje Y - líneas horizontales y precios
      const ySteps = 6
      ctx.textAlign = "right"
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "#64748b"

      for (let i = 0; i <= ySteps; i++) {
        const y = padding.top + (chartHeight / ySteps) * i
        const price = maxPrice - (priceRange / ySteps) * i

        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(width - padding.right, y)
        ctx.stroke()

        // Mostrar precio con formato adecuado según el activo
        let priceText = ""
        if (selectedAsset.symbol === "BTC/USD") {
          priceText = price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        } else if (selectedAsset.symbol === "XAUUSD") {
          priceText = price.toFixed(2)
        } else if (selectedAsset.symbol === "EUR/USD") {
          priceText = price.toFixed(4)
        } else {
          priceText = price.toFixed(2)
        }

        ctx.fillText(priceText, padding.left - 5, y + 3)
      }

      // Eje X - fechas
      ctx.textAlign = "center"
      const xLabelCount = 5
      const xLabelStep = Math.floor(data.length / xLabelCount)

      for (let i = 0; i < data.length; i += xLabelStep) {
        const x = padding.left + i * xScale
        const date = data[i].time

        ctx.beginPath()
        ctx.moveTo(x, padding.top + chartHeight)
        ctx.lineTo(x, padding.top + chartHeight + 5)
        ctx.stroke()

        let dateLabel = ""
        if (timeframe === "1D" || timeframe === "1W") {
          dateLabel = `${date.getDate()}/${date.getMonth() + 1}`
        } else {
          dateLabel = `${date.getHours()}:00`
        }

        ctx.fillText(dateLabel, x, padding.top + chartHeight + 15)
      }

      // Dibujar velas
      data.forEach((candle, i) => {
        const x = padding.left + i * xScale
        const candleWidth = Math.max(xScale * 0.8, 1)

        const yHigh = padding.top + chartHeight * (1 - (candle.high - minPrice) / priceRange)
        const yLow = padding.top + chartHeight * (1 - (candle.low - minPrice) / priceRange)
        const yOpen = padding.top + chartHeight * (1 - (candle.open - minPrice) / priceRange)
        const yClose = padding.top + chartHeight * (1 - (candle.close - minPrice) / priceRange)

        // Mecha
        ctx.beginPath()
        ctx.strokeStyle = candle.close >= candle.open ? "#22c55e" : "#ef4444"
        ctx.moveTo(x + candleWidth / 2, yHigh)
        ctx.lineTo(x + candleWidth / 2, yLow)
        ctx.stroke()

        // Cuerpo de la vela
        ctx.fillStyle = candle.close >= candle.open ? "#22c55e" : "#ef4444"
        const candleHeight = Math.abs(yOpen - yClose)
        ctx.fillRect(x, candle.close >= candle.open ? yClose : yOpen, candleWidth, Math.max(candleHeight, 1))
      })

      // Dibujar EMA
      if (showEMA && emaValues.length > 0) {
        const candleWidth = Math.max(xScale * 0.8, 1)
        ctx.beginPath()
        ctx.strokeStyle = "#3b82f6" // Azul
        ctx.lineWidth = 1.5

        for (let i = 0; i < emaValues.length; i++) {
          const x = padding.left + i * xScale + candleWidth / 2
          const y = padding.top + chartHeight * (1 - (emaValues[i] - minPrice) / priceRange)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      // Dibujar SMA
      if (showSMA && smaValues.length > 0) {
        const candleWidth = Math.max(xScale * 0.8, 1)
        ctx.beginPath()
        ctx.strokeStyle = "#ef4444" // Rojo
        ctx.lineWidth = 1.5

        let firstValidIndex = 0
        while (smaValues[firstValidIndex] === null && firstValidIndex < smaValues.length) {
          firstValidIndex++
        }

        if (firstValidIndex < smaValues.length) {
          const x = padding.left + firstValidIndex * xScale + candleWidth / 2
          const y = padding.top + chartHeight * (1 - (smaValues[firstValidIndex] - minPrice) / priceRange)
          ctx.moveTo(x, y)

          for (let i = firstValidIndex + 1; i < smaValues.length; i++) {
            if (smaValues[i] !== null) {
              const x = padding.left + i * xScale + candleWidth / 2
              const y = padding.top + chartHeight * (1 - (smaValues[i] - minPrice) / priceRange)
              ctx.lineTo(x, y)
            }
          }

          ctx.stroke()
        }
      }

      // Dibujar información del precio actual
      const lastCandle = data[data.length - 1]
      ctx.fillStyle = "#f8fafc08"
      ctx.fillRect(width - padding.right + 5, padding.top, 75, 110)
      ctx.strokeStyle = "#e2e8f020"
      ctx.strokeRect(width - padding.right + 5, padding.top, 75, 110)

      ctx.font = "bold 11px sans-serif"
      ctx.fillStyle = lastCandle.close >= lastCandle.open ? "#22c55e" : "#ef4444"
      ctx.textAlign = "left"

      // Formatear precio según el activo
      let priceText = ""
      if (selectedAsset.symbol === "BTC/USD") {
        priceText = lastCandle.close.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      } else if (selectedAsset.symbol === "XAUUSD") {
        priceText = lastCandle.close.toFixed(2)
      } else if (selectedAsset.symbol === "EUR/USD") {
        priceText = lastCandle.close.toFixed(4)
      } else {
        priceText = lastCandle.close.toFixed(2)
      }

      ctx.fillText(priceText, width - padding.right + 10, padding.top + 15)

      ctx.font = "10px sans-serif"
      ctx.fillStyle = "#64748b"
      ctx.fillText("O: " + lastCandle.open.toFixed(2), width - padding.right + 10, padding.top + 35)
      ctx.fillText("H: " + lastCandle.high.toFixed(2), width - padding.right + 10, padding.top + 55)
      ctx.fillText("L: " + lastCandle.low.toFixed(2), width - padding.right + 10, padding.top + 75)
      ctx.fillText("C: " + lastCandle.close.toFixed(2), width - padding.right + 10, padding.top + 95)

      // Dibujar volumen
      ctx.fillStyle = "#64748b40"
      ctx.fillText("Vol: " + lastCandle.volume.toLocaleString(), width - padding.right - 130, padding.top + 15)

      // Dibujar leyenda de indicadores
      if (showEMA || showSMA) {
        let legendY = padding.top + 15

        if (showEMA) {
          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(padding.left + 10, legendY)
          ctx.lineTo(padding.left + 30, legendY)
          ctx.stroke()

          ctx.fillStyle = "#64748b"
          ctx.textAlign = "left"
          ctx.fillText(`EMA(${emaLength})`, padding.left + 35, legendY + 3)
          legendY += 15
        }

        if (showSMA) {
          ctx.strokeStyle = "#ef4444"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(padding.left + 10, legendY)
          ctx.lineTo(padding.left + 30, legendY)
          ctx.stroke()

          ctx.fillStyle = "#64748b"
          ctx.textAlign = "left"
          ctx.fillText(`SMA(${smaLength})`, padding.left + 35, legendY + 3)
        }
      }
    },
    [selectedAsset.symbol, showEMA, showSMA, emaValues, smaValues, emaLength, smaLength],
  )

  // Manejar la ejecución de operaciones desde la estrategia
  const handleExecuteTrade = useCallback((direction: "call" | "put", amount: string, expiration: string) => {
    console.log(`Ejecutando operación: ${direction} por $${amount} con expiración ${expiration}`)
    // Aquí se integraría con la API real de IQ Option
  }, [])

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex items-center p-2 border-b border-border">
        <div className="flex items-center">
          <div className="relative">
            <Button
              variant="ghost"
              className="text-lg font-semibold h-8 px-2"
              onClick={() => setAssetMenuOpen(!assetMenuOpen)}
            >
              {selectedAsset.symbol} <ChevronDown className="ml-1 h-4 w-4" />
            </Button>

            {assetMenuOpen && (
              <div className="absolute top-full left-0 z-50 mt-1 w-48 rounded-md bg-background shadow-lg border border-border">
                {availableAssets.map((asset) => (
                  <Button
                    key={asset.symbol}
                    variant="ghost"
                    className="w-full justify-start text-sm h-9"
                    onClick={() => {
                      setSelectedAsset(asset)
                      setAssetMenuOpen(false)
                    }}
                  >
                    {asset.symbol} - {asset.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="ml-2 flex items-center">
            <span className="text-sm">{selectedAsset.name}</span>
            <Badge className={`ml-2 ${selectedAsset.change > 0 ? "bg-green-500" : "bg-red-500"}`}>
              {selectedAsset.change > 0 ? "+" : ""}
              {selectedAsset.change}%
            </Badge>
          </div>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <div className="flex space-x-1">
            {["1m", "5m", "15m", "1h", "4h", "1D", "1W", "1M"].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center ml-auto space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowStrategy(!showStrategy)}>
                  <TrendingUp className={`h-4 w-4 ${showStrategy ? "text-primary" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Estrategia de Trading</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowIQOption(!showIQOption)}>
                  <AlertTriangle className={`h-4 w-4 ${showIQOption ? "text-primary" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>IQ Option Trading</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAIPanel(!showAIPanel)}>
                  <Brain className={`h-4 w-4 ${showAIPanel ? "text-primary" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Análisis de IA</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <LineChart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tipo de gráfico</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    const indicatorsMenu = document.getElementById("indicators-menu")
                    if (indicatorsMenu) {
                      indicatorsMenu.classList.toggle("hidden")
                    }
                  }}
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Indicadores</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div
            id="indicators-menu"
            className="absolute top-12 right-32 bg-background border border-border rounded-md shadow-lg p-2 hidden z-50"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  EMA
                </label>
                <input type="checkbox" checked={showEMA} onChange={() => setShowEMA(!showEMA)} className="h-3 w-3" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  SMA
                </label>
                <input type="checkbox" checked={showSMA} onChange={() => setShowSMA(!showSMA)} className="h-3 w-3" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs">Periodos EMA</label>
                <select
                  value={emaLength}
                  onChange={(e) => setEmaLength(Number(e.target.value))}
                  className="text-xs bg-background border border-border rounded p-0.5"
                >
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="8">8</option>
                  <option value="13">13</option>
                  <option value="21">21</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs">Periodos SMA</label>
                <select
                  value={smaLength}
                  onChange={(e) => setSmaLength(Number(e.target.value))}
                  className="text-xs bg-background border border-border rounded p-0.5"
                >
                  <option value="5">5</option>
                  <option value="8">8</option>
                  <option value="13">13</option>
                  <option value="21">21</option>
                  <option value="34">34</option>
                </select>
              </div>
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Herramientas de dibujo</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Guardar gráfico</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Descargar</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Compartir</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedAsset.symbol} - {selectedAsset.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="h-full">
                      <canvas className="w-full h-[calc(100%-40px)]" />
                    </div>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>Pantalla completa</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {showAIPanel && (
          <DraggablePanel initialPosition={{ x: window.innerWidth - 300, y: 20 }} zIndex={10}>
            <AIAnalysisPanel asset={selectedAsset} />
          </DraggablePanel>
        )}

        {showIQOption && (
          <DraggablePanel initialPosition={{ x: 20, y: 20 }} zIndex={15}>
            <IQOptionIntegration asset={selectedAsset} />
          </DraggablePanel>
        )}

        {showStrategy && (
          <DraggablePanel initialPosition={{ x: 20, y: 20 }} zIndex={20}>
            <TradingStrategy asset={selectedAsset} chartData={chartData} onExecuteTrade={handleExecuteTrade} />
          </DraggablePanel>
        )}
      </div>

      <div className="absolute left-3 top-16 flex flex-col space-y-1">
        <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full">
          <Crosshair className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
          <Text className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
          <Eraser className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
          <Eye className="h-3.5 w-3.5" />
        </Button>
        <Separator className="h-px w-7 mx-auto" />
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
          <Plus className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
          <Minus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
