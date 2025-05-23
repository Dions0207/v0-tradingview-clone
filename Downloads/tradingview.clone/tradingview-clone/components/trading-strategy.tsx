"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowDown, ArrowUp, Check, Clock, Loader2, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { iqOptionApi, type IQOptionCredentials } from "@/lib/iq-option-api"

interface TradingStrategyProps {
  asset: {
    symbol: string
    name: string
    price: number
    change: number
  }
  chartData?: any[]
  onExecuteTrade?: (direction: "call" | "put", amount: string, expiration: string) => void
  className?: string
}

export function TradingStrategy({ asset, chartData = [], onExecuteTrade, className }: TradingStrategyProps) {
  const [autoTrading, setAutoTrading] = useState(false)
  const [amount, setAmount] = useState("25")
  const [expiration, setExpiration] = useState("5m")
  const [emaLength, setEmaLength] = useState("5")
  const [smaLength, setSmaLength] = useState("8")
  const [lastSignal, setLastSignal] = useState<"buy" | "sell" | null>(null)
  const [signalStrength, setSignalStrength] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [expanded, setExpanded] = useState(true)
  const [trades, setTrades] = useState<
    Array<{
      id: number
      time: Date
      direction: "buy" | "sell"
      price: number
      result?: "win" | "loss" | "pending"
    }>
  >([])
  const [error, setError] = useState<string | null>(null)

  // Calcular las medias móviles y señales
  useEffect(() => {
    if (!chartData || chartData.length < Math.max(Number(emaLength), Number(smaLength))) return

    // Calcular EMA
    const calculateEMA = (data: any[], length: number) => {
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
    const calculateSMA = (data: any[], length: number) => {
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

    const emaValues = calculateEMA(chartData, Number(emaLength))
    const smaValues = calculateSMA(chartData, Number(smaLength))

    // Determinar señal basada en el cruce de medias móviles
    const lastEma = emaValues[emaValues.length - 1]
    const lastSma = smaValues[smaValues.length - 1]
    const prevEma = emaValues[emaValues.length - 2]
    const prevSma = smaValues[smaValues.length - 2]

    // Verificar cruce
    if (prevEma < prevSma && lastEma > lastSma) {
      setLastSignal("buy")
      setSignalStrength(Math.min(100, Math.round(((lastEma - lastSma) / lastSma) * 10000)))
    } else if (prevEma > prevSma && lastEma < lastSma) {
      setLastSignal("sell")
      setSignalStrength(Math.min(100, Math.round(((lastSma - lastEma) / lastSma) * 10000)))
    }

    // Verificar si la vela cerró por encima/debajo de la SMA para entradas adicionales
    const lastCandle = chartData[chartData.length - 1]
    const lastClose = lastCandle.close

    if (autoTrading && lastSignal && Math.random() > 0.7) {
      // Simulación de trading
      const direction = lastSignal === "buy" ? "call" : "put"
      executeTrade(direction)
    }
  }, [chartData, emaLength, smaLength, autoTrading, lastSignal])

  const handleConnect = useCallback(async () => {
    if (!username || !password) {
      setError("Por favor, ingresa tu usuario y contraseña")
      return
    }

    setProcessing(true)
    setError(null)

    try {
      // Intentar conectar con la API de IQ Option
      const credentials: IQOptionCredentials = {
        email: username,
        password: password,
      }

      const success = await iqOptionApi.connect(credentials)

      if (success) {
        setConnected(true)
        setError(null)
      } else {
        setError("No se pudo conectar. Verifica tus credenciales.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al conectar")
    } finally {
      setProcessing(false)
    }
  }, [username, password])

  const executeTrade = useCallback(
    async (direction: "call" | "put") => {
      if (!connected || processing) return

      setProcessing(true)
      setError(null)

      try {
        // Llamar al callback si existe
        if (onExecuteTrade) {
          onExecuteTrade(direction, amount, expiration)
        }

        // Simular ejecución de operación
        const newTrade = {
          id: Date.now(),
          time: new Date(),
          direction: direction === "call" ? "buy" : "sell",
          price: asset.price,
          result: "pending" as "win" | "loss" | "pending",
        }

        setTrades((prev) => [newTrade, ...prev].slice(0, 10))

        // Intentar ejecutar la operación real con IQ Option API
        let expirationInSeconds = 60
        if (expiration === "5m") expirationInSeconds = 300
        if (expiration === "15m") expirationInSeconds = 900
        if (expiration === "1h") expirationInSeconds = 3600

        try {
          const assetName = asset.symbol.replace("/", "")
          await iqOptionApi.buyOption(assetName, Number(amount), direction, expirationInSeconds)

          // Simulación del resultado después de un tiempo
          setTimeout(() => {
            setTrades((prev) =>
              prev.map((trade) =>
                trade.id === newTrade.id ? { ...trade, result: Math.random() > 0.5 ? "win" : "loss" } : trade,
              ),
            )
          }, 5000)
        } catch (err) {
          console.error("Error ejecutando operación:", err)
          setError("Error al ejecutar la operación")

          // Actualizar el estado de la operación como fallida
          setTrades((prev) => prev.map((trade) => (trade.id === newTrade.id ? { ...trade, result: "loss" } : trade)))
        }
      } finally {
        setProcessing(false)
      }
    },
    [connected, processing, asset.price, amount, expiration, onExecuteTrade],
  )

  const handleDisconnect = useCallback(async () => {
    try {
      await iqOptionApi.disconnect()
    } finally {
      setConnected(false)
      setUsername("")
      setPassword("")
    }
  }, [])

  return (
    <Card className={cn("shadow-lg border-border w-full max-w-[350px]", className)}>
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <CardTitle className="text-sm flex justify-between items-center">
          <span className="flex items-center gap-2">
            <span>Trading IQ Option</span>
            <Badge variant={lastSignal === "buy" ? "default" : lastSignal === "sell" ? "destructive" : "outline"}>
              {lastSignal === "buy" ? "COMPRA" : lastSignal === "sell" ? "VENTA" : "NEUTRAL"}
            </Badge>
          </span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4 p-3">
          {!connected ? (
            <div className="space-y-3">
              <div className="text-xs font-medium mb-2">Conectar a IQ Option</div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="username"
                    className="h-8 text-xs"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="h-8 text-xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                  />
                </div>

                {error && <div className="text-xs text-red-500">{error}</div>}

                <Button
                  size="sm"
                  className="w-full text-xs"
                  onClick={handleConnect}
                  disabled={processing || !username || !password}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    "Conectar a IQ Option"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">Configuración de Estrategia</div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="auto-trading" className="text-xs">
                      Auto Trading
                    </Label>
                    <Switch id="auto-trading" checked={autoTrading} onCheckedChange={setAutoTrading} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="ema-length" className="text-xs">
                      EMA Periodos
                    </Label>
                    <Select value={emaLength} onValueChange={setEmaLength}>
                      <SelectTrigger id="ema-length" className="h-8 text-xs">
                        <SelectValue placeholder="Periodos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="13">13</SelectItem>
                        <SelectItem value="21">21</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="sma-length" className="text-xs">
                      SMA Periodos
                    </Label>
                    <Select value={smaLength} onValueChange={setSmaLength}>
                      <SelectTrigger id="sma-length" className="h-8 text-xs">
                        <SelectValue placeholder="Periodos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="13">13</SelectItem>
                        <SelectItem value="21">21</SelectItem>
                        <SelectItem value="34">34</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="amount" className="text-xs">
                      Monto ($)
                    </Label>
                    <Input
                      id="amount"
                      className="h-8 text-xs"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="expiration" className="text-xs">
                      Expiración
                    </Label>
                    <Select value={expiration} onValueChange={setExpiration}>
                      <SelectTrigger id="expiration" className="h-8 text-xs">
                        <SelectValue placeholder="Expiración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1m">1 minuto</SelectItem>
                        <SelectItem value="5m">5 minutos</SelectItem>
                        <SelectItem value="15m">15 minutos</SelectItem>
                        <SelectItem value="1h">1 hora</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium">Señal Actual</div>
                  <div className="text-xs">Fuerza: {signalStrength}%</div>
                </div>

                <div className="p-2 rounded-md bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {lastSignal === "buy" ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : lastSignal === "sell" ? (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <div className="text-xs font-medium">
                        {lastSignal === "buy"
                          ? "Señal de Compra"
                          : lastSignal === "sell"
                            ? "Señal de Venta"
                            : "Esperando Señal"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lastSignal
                          ? `EMA(${emaLength}) cruzó ${lastSignal === "buy" ? "por encima" : "por debajo"} de SMA(${smaLength})`
                          : "EMA y SMA no han cruzado"}
                      </div>
                    </div>
                  </div>
                </div>

                {error && <div className="text-xs text-red-500">{error}</div>}

                <div className="flex gap-2 mt-2">
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-xs"
                    onClick={() => executeTrade("call")}
                    disabled={processing}
                  >
                    {processing ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                    COMPRAR
                  </Button>
                  <Button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-xs"
                    onClick={() => executeTrade("put")}
                    disabled={processing}
                  >
                    {processing ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                    VENDER
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-xs font-medium">Últimas Operaciones</div>
                <div className="max-h-[120px] overflow-y-auto space-y-1">
                  {trades.length === 0 ? (
                    <div className="text-xs text-muted-foreground text-center py-2">No hay operaciones recientes</div>
                  ) : (
                    trades.map((trade) => (
                      <div
                        key={trade.id}
                        className="flex items-center justify-between text-xs p-1 rounded-sm hover:bg-muted/30"
                      >
                        <div className="flex items-center gap-1">
                          {trade.direction === "buy" ? (
                            <ArrowUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-500" />
                          )}
                          <span>
                            {trade.direction === "buy" ? "Compra" : "Venta"} a{" "}
                            {trade.price.toLocaleString(undefined, {
                              minimumFractionDigits: asset.symbol === "EUR/USD" ? 4 : 2,
                              maximumFractionDigits: asset.symbol === "EUR/USD" ? 4 : 2,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{trade.time.toLocaleTimeString()}</span>
                          {trade.result === "pending" ? (
                            <Clock className="h-3 w-3 text-yellow-500" />
                          ) : trade.result === "win" ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-xs text-center text-muted-foreground">
                Conectado a IQ Option como <span className="font-medium">{username}</span>
                <Button variant="link" className="text-xs h-auto p-0 pl-1" onClick={handleDisconnect}>
                  Desconectar
                </Button>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  )
}
