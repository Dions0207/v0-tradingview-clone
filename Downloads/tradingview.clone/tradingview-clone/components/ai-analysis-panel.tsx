"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowDown, ArrowUp, Brain, Clock, LineChart, Loader2, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface AIAnalysisPanelProps {
  asset: {
    symbol: string
    name: string
    price: number
    change: number
  }
}

interface AIAnalysis {
  trend: "up" | "down" | "neutral"
  probability: number
  shortTerm: string
  mediumTerm: string
  longTerm: string
  supportLevels: number[]
  resistanceLevels: number[]
  indicators: {
    rsi: number
    macd: "bullish" | "bearish" | "neutral"
    ma: "above" | "below" | "crossing"
    volume: "increasing" | "decreasing" | "stable"
  }
  sentiment: {
    social: "positive" | "negative" | "neutral"
    news: "positive" | "negative" | "neutral"
    institutional: "positive" | "negative" | "neutral"
  }
  recommendation: string
}

export function AIAnalysisPanel({ asset }: AIAnalysisPanelProps) {
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [showPanel, setShowPanel] = useState(true)

  useEffect(() => {
    // Simular carga de análisis de IA
    setLoading(true)
    setAnalysis(null)

    const timer = setTimeout(() => {
      generateAnalysis()
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [asset.symbol]) // Solo dependemos del símbolo del activo

  const generateAnalysis = useCallback(() => {
    // Generar un análisis simulado basado en el precio actual y tendencia
    const isBullish = asset.change > 0
    const trend = isBullish ? "up" : Math.random() > 0.3 ? "down" : "neutral"

    // Calcular niveles de soporte y resistencia simulados basados en el activo
    const basePrice = asset.price

    // Ajustar los porcentajes según el activo
    let supportPercentages = [0.985, 0.97, 0.95]
    let resistancePercentages = [1.015, 1.03, 1.05]

    // Para Bitcoin, los niveles son más amplios debido a su volatilidad
    if (asset.symbol === "BTC/USD") {
      supportPercentages = [0.97, 0.94, 0.91]
      resistancePercentages = [1.03, 1.06, 1.09]
    }
    // Para oro, los niveles son más estrechos
    else if (asset.symbol === "XAUUSD") {
      supportPercentages = [0.99, 0.985, 0.98]
      resistancePercentages = [1.01, 1.015, 1.02]
    }

    const supports = supportPercentages.map((p) => formatPrice(basePrice * p, asset.symbol))

    const resistances = resistancePercentages.map((p) => formatPrice(basePrice * p, asset.symbol))

    // Generar análisis completo
    setAnalysis({
      trend,
      probability: 55 + Math.floor(Math.random() * 35),
      shortTerm: trend === "up" ? "Alcista" : trend === "down" ? "Bajista" : "Rango lateral",
      mediumTerm: Math.random() > 0.5 ? "Alcista con posible consolidación" : "Tendencia bajista que podría revertirse",
      longTerm: isBullish ? "Alcista siguiendo la tendencia del mercado" : "Bajista con potencial de recuperación",
      supportLevels: supports,
      resistanceLevels: resistances,
      indicators: {
        rsi: 30 + Math.floor(Math.random() * 40),
        macd: isBullish ? "bullish" : "bearish",
        ma: isBullish ? "above" : "below",
        volume: Math.random() > 0.5 ? "increasing" : "decreasing",
      },
      sentiment: {
        social: Math.random() > 0.6 ? "positive" : Math.random() > 0.5 ? "negative" : "neutral",
        news: Math.random() > 0.6 ? "positive" : Math.random() > 0.5 ? "negative" : "neutral",
        institutional: isBullish ? "positive" : "negative",
      },
      recommendation: isBullish
        ? "Oportunidad de compra con stop loss debajo del soporte principal"
        : "Considerar venta si rompe el soporte clave, con objetivos conservadores",
    })
  }, [asset.price, asset.change, asset.symbol])

  // Función para formatear precios según el activo
  const formatPrice = (price: number, symbol: string) => {
    if (symbol === "BTC/USD") {
      return Math.round(price)
    } else if (symbol === "XAUUSD") {
      return Number(price.toFixed(2))
    } else if (symbol === "EUR/USD") {
      return Number(price.toFixed(4))
    } else {
      return Number(price.toFixed(2))
    }
  }

  const handleRefreshAnalysis = () => {
    setAnalyzing(true)

    setTimeout(() => {
      generateAnalysis()
      setAnalyzing(false)
    }, 2000)
  }

  if (!showPanel) return null

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4 text-primary" />
            <span>Análisis IA</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowPanel(false)}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium">{asset.symbol}</div>
            <div className="text-xs text-muted-foreground">{asset.name}</div>
          </div>
          <Badge variant={asset.change > 0 ? "default" : "destructive"} className="text-xs">
            {asset.change > 0 ? "+" : ""}
            {asset.change}%
          </Badge>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Analizando {asset.symbol}...</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium">Predicción</span>
                </div>
                <div className="flex items-center">
                  {analysis?.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : analysis?.trend === "down" ? (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <LineChart className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-xs ml-1 font-bold">
                    {analysis?.trend === "up" ? "ALCISTA" : analysis?.trend === "down" ? "BAJISTA" : "NEUTRAL"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Probabilidad</span>
                  <span className="text-xs font-medium">{analysis?.probability}%</span>
                </div>
                <Progress value={analysis?.probability} className="h-1.5" />
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-b-0">
                <AccordionTrigger className="py-2 text-xs">Detalles del análisis</AccordionTrigger>
                <AccordionContent className="text-xs space-y-3">
                  <div className="space-y-1">
                    <p className="font-medium">Niveles clave:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-muted-foreground">Soportes:</p>
                        <ul className="space-y-0.5">
                          {analysis?.supportLevels.map((level, i) => (
                            <li key={`support-${i}`}>
                              {asset.symbol === "BTC/USD"
                                ? level.toLocaleString()
                                : level.toLocaleString(undefined, {
                                    minimumFractionDigits: asset.symbol === "EUR/USD" ? 4 : 2,
                                    maximumFractionDigits: asset.symbol === "EUR/USD" ? 4 : 2,
                                  })}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Resistencias:</p>
                        <ul className="space-y-0.5">
                          {analysis?.resistanceLevels.map((level, i) => (
                            <li key={`resistance-${i}`}>
                              {asset.symbol === "BTC/USD"
                                ? level.toLocaleString()
                                : level.toLocaleString(undefined, {
                                    minimumFractionDigits: asset.symbol === "EUR/USD" ? 4 : 2,
                                    maximumFractionDigits: asset.symbol === "EUR/USD" ? 4 : 2,
                                  })}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Indicadores técnicos:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RSI:</span>
                        <span
                          className={`${
                            analysis?.indicators.rsi && analysis.indicators.rsi > 70
                              ? "text-red-500"
                              : analysis?.indicators.rsi && analysis.indicators.rsi < 30
                                ? "text-green-500"
                                : ""
                          }`}
                        >
                          {analysis?.indicators.rsi}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MACD:</span>
                        <span
                          className={`${
                            analysis?.indicators.macd === "bullish"
                              ? "text-green-500"
                              : analysis?.indicators.macd === "bearish"
                                ? "text-red-500"
                                : ""
                          }`}
                        >
                          {analysis?.indicators.macd === "bullish"
                            ? "Alcista"
                            : analysis?.indicators.macd === "bearish"
                              ? "Bajista"
                              : "Neutral"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MA:</span>
                        <span>
                          {analysis?.indicators.ma === "above"
                            ? "Por encima"
                            : analysis?.indicators.ma === "below"
                              ? "Por debajo"
                              : "Cruzando"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Volumen:</span>
                        <span>
                          {analysis?.indicators.volume === "increasing"
                            ? "Creciente"
                            : analysis?.indicators.volume === "decreasing"
                              ? "Decreciente"
                              : "Estable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Análisis temporal:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Corto plazo:</span>
                        <span>{analysis?.shortTerm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medio plazo:</span>
                        <span>{analysis?.mediumTerm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Largo plazo:</span>
                        <span>{analysis?.longTerm}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Sentimiento:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Social:</span>
                        <span
                          className={`${
                            analysis?.sentiment.social === "positive"
                              ? "text-green-500"
                              : analysis?.sentiment.social === "negative"
                                ? "text-red-500"
                                : ""
                          }`}
                        >
                          {analysis?.sentiment.social === "positive"
                            ? "Positivo"
                            : analysis?.sentiment.social === "negative"
                              ? "Negativo"
                              : "Neutral"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Noticias:</span>
                        <span
                          className={`${
                            analysis?.sentiment.news === "positive"
                              ? "text-green-500"
                              : analysis?.sentiment.news === "negative"
                                ? "text-red-500"
                                : ""
                          }`}
                        >
                          {analysis?.sentiment.news === "positive"
                            ? "Positivo"
                            : analysis?.sentiment.news === "negative"
                              ? "Negativo"
                              : "Neutral"}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recommendation" className="border-b-0">
                <AccordionTrigger className="py-2 text-xs">Recomendación</AccordionTrigger>
                <AccordionContent className="text-xs">
                  <p>{analysis?.recommendation}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Actualizado hace 2 min</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={handleRefreshAnalysis}
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Analizando
                  </>
                ) : (
                  "Actualizar"
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
