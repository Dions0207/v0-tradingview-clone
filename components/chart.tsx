"use client"

import { useEffect, useRef, useState } from "react"
import {
  ChevronDown,
  Crosshair,
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
  Undo2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ChartComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [timeframe, setTimeframe] = useState("1D")

  useEffect(() => {
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

      drawChart(ctx, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [timeframe])

  const drawChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height)

    // Configuración del gráfico
    const padding = { top: 20, right: 50, bottom: 30, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Generar datos aleatorios para el gráfico de velas
    const dataPoints = 100
    const data = generateCandlestickData(dataPoints)

    // Calcular escalas
    const xScale = chartWidth / dataPoints
    const minPrice = Math.min(...data.flatMap((d) => [d.low, d.open, d.close]))
    const maxPrice = Math.max(...data.flatMap((d) => [d.high, d.open, d.close]))
    const priceRange = maxPrice - minPrice

    // Dibujar ejes
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1

    // Eje Y - líneas horizontales y precios
    const ySteps = 5
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

      ctx.fillText(price.toFixed(2), padding.left - 5, y + 3)
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

    // Dibujar información del precio actual
    const lastCandle = data[data.length - 1]
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(width - padding.right + 5, padding.top, 45, 80)

    ctx.font = "bold 11px sans-serif"
    ctx.fillStyle = lastCandle.close >= lastCandle.open ? "#22c55e" : "#ef4444"
    ctx.textAlign = "left"
    ctx.fillText(lastCandle.close.toFixed(2), width - padding.right + 10, padding.top + 15)

    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"
    ctx.fillText("O: " + lastCandle.open.toFixed(2), width - padding.right + 10, padding.top + 30)
    ctx.fillText("H: " + lastCandle.high.toFixed(2), width - padding.right + 10, padding.top + 45)
    ctx.fillText("L: " + lastCandle.low.toFixed(2), width - padding.right + 10, padding.top + 60)
    ctx.fillText("C: " + lastCandle.close.toFixed(2), width - padding.right + 10, padding.top + 75)
  }

  const generateCandlestickData = (count: number) => {
    const data = []
    let price = 100 + Math.random() * 20

    for (let i = 0; i < count; i++) {
      const change = (Math.random() - 0.5) * 2
      const open = price
      price = price + change
      const close = price

      const high = Math.max(open, close) + Math.random() * 0.5
      const low = Math.min(open, close) - Math.random() * 0.5

      data.push({ open, high, low, close })
    }

    return data
  }

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex items-center p-2 border-b border-border">
        <div className="flex items-center">
          <Button variant="ghost" className="text-lg font-semibold h-8 px-2">
            AAPL <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
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
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Indicadores</TooltipContent>
            </Tooltip>
          </TooltipProvider>

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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Text className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Añadir texto</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Deshacer</TooltipContent>
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
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Compartir</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pantalla completa</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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
