"use client"

import { useState, useCallback } from "react"
import { Check, Clock, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface IQOptionIntegrationProps {
  asset: {
    symbol: string
    name: string
    price: number
    change: number
  }
}

export function IQOptionIntegration({ asset }: IQOptionIntegrationProps) {
  const [amount, setAmount] = useState("100")
  const [duration, setDuration] = useState("5m")
  const [direction, setDirection] = useState<"call" | "put" | null>(null)
  const [orderStatus, setOrderStatus] = useState<"none" | "pending" | "completed" | "error">("none")
  const [orderResult, setOrderResult] = useState<"win" | "loss" | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handlePlaceOrder = useCallback((type: "call" | "put") => {
    setDirection(type)
    setOrderStatus("pending")

    // Simular procesamiento de orden
    setTimeout(() => {
      setOrderStatus("completed")
      // Resultado aleatorio para demostración
      setOrderResult(Math.random() > 0.5 ? "win" : "loss")
    }, 2000)
  }, [])

  const handleLogin = useCallback(() => {
    if (username && password) {
      setOrderStatus("pending")

      // Simular login
      setTimeout(() => {
        setIsLoggedIn(true)
        setOrderStatus("none")
      }, 1500)
    }
  }, [username, password])

  const resetOrder = useCallback(() => {
    setOrderStatus("none")
    setOrderResult(null)
    setDirection(null)
  }, [])

  // Formatear precio según el activo
  const formatPrice = (price: number) => {
    if (asset.symbol === "BTC/USD") {
      return price.toLocaleString()
    } else if (asset.symbol === "XAUUSD") {
      return price.toFixed(2)
    } else if (asset.symbol === "EUR/USD") {
      return price.toFixed(4)
    } else {
      return price.toFixed(2)
    }
  }

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between items-center">
          <span>IQ Option Trading</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={resetOrder}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-3">
        {!isLoggedIn ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-xs">
                Usuario
              </Label>
              <Input
                id="username"
                className="h-8 text-xs"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              onClick={handleLogin}
              disabled={orderStatus === "pending" || !username || !password}
            >
              {orderStatus === "pending" ? "Conectando..." : "Conectar a IQ Option"}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium">{asset.symbol}</div>
                <div className="text-xs text-muted-foreground">{formatPrice(asset.price)}</div>
              </div>
              <Badge variant={asset.change > 0 ? "default" : "destructive"} className="text-xs">
                {asset.change > 0 ? "+" : ""}
                {asset.change}%
              </Badge>
            </div>

            <Tabs defaultValue="binary" className="w-full">
              <TabsList className="grid grid-cols-2 h-8">
                <TabsTrigger value="binary" className="text-xs h-7">
                  Binario
                </TabsTrigger>
                <TabsTrigger value="digital" className="text-xs h-7">
                  Digital
                </TabsTrigger>
              </TabsList>

              <TabsContent value="binary" className="mt-2 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="amount" className="text-xs">
                      Inversión
                    </Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs">$</span>
                      <Input
                        id="amount"
                        className="pl-6 h-8 text-xs"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="duration" className="text-xs">
                      Duración
                    </Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration" className="h-8 text-xs">
                        <SelectValue placeholder="Seleccionar" />
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

                {orderStatus === "none" && (
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-green-500 hover:bg-green-600 text-xs"
                      onClick={() => handlePlaceOrder("call")}
                    >
                      COMPRAR
                    </Button>
                    <Button
                      className="flex-1 bg-red-500 hover:bg-red-600 text-xs"
                      onClick={() => handlePlaceOrder("put")}
                    >
                      VENDER
                    </Button>
                  </div>
                )}

                {orderStatus === "pending" && (
                  <div className="bg-muted/50 rounded-md p-3 text-center space-y-1">
                    <div className="flex justify-center">
                      <Clock className="h-4 w-4 animate-spin text-primary" />
                    </div>
                    <p className="text-xs">
                      Procesando orden {direction === "call" ? "COMPRA" : "VENTA"} de {asset.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${amount} - {duration}
                    </p>
                  </div>
                )}

                {orderStatus === "completed" && (
                  <div
                    className={`rounded-md p-3 text-center space-y-1 ${
                      orderResult === "win" ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  >
                    <div className="flex justify-center">
                      {orderResult === "win" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs font-medium">
                      {orderResult === "win" ? "¡Operación exitosa!" : "Operación fallida"}
                    </p>
                    <p className="text-xs">
                      {direction === "call" ? "COMPRA" : "VENTA"} de {asset.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${amount} -{" "}
                      {orderResult === "win" ? `+$${(Number.parseFloat(amount) * 0.85).toFixed(2)}` : `-$${amount}`}
                    </p>
                    <Button variant="outline" size="sm" className="text-xs mt-1" onClick={resetOrder}>
                      Nueva operación
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="digital" className="mt-2">
                <div className="text-xs text-center p-4 bg-muted/30 rounded-md">
                  Las opciones digitales están disponibles en la plataforma completa de IQ Option.
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-xs text-center text-muted-foreground">
              Conectado a IQ Option como <span className="font-medium">{username}</span>
              <Button variant="link" className="text-xs h-auto p-0 pl-1" onClick={() => setIsLoggedIn(false)}>
                Desconectar
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
