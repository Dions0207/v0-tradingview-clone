"use client"

import { useState } from "react"
import { Brain, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AISettings() {
  const [notifications, setNotifications] = useState(true)
  const [autoTrade, setAutoTrade] = useState(false)
  const [riskLevel, setRiskLevel] = useState([50])
  const [predictionModel, setPredictionModel] = useState("hybrid")
  const [dataTimeframe, setDataTimeframe] = useState("1d")
  const [showSettings, setShowSettings] = useState(true)

  if (!showSettings) return null

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4 text-primary" />
            <span>Configuración de IA</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowSettings(false)}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-3">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 h-8">
            <TabsTrigger value="general" className="text-xs h-7">
              General
            </TabsTrigger>
            <TabsTrigger value="model" className="text-xs h-7">
              Modelo
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs h-7">
              Alertas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-2 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-notifications" className="text-xs">
                  Notificaciones de IA
                </Label>
                <Switch id="ai-notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-trade" className="text-xs">
                  Trading automático
                </Label>
                <Switch id="auto-trade" checked={autoTrade} onCheckedChange={setAutoTrade} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="risk-level" className="text-xs">
                  Nivel de riesgo
                </Label>
                <span className="text-xs font-medium">{riskLevel[0]}%</span>
              </div>
              <Slider
                id="risk-level"
                value={riskLevel}
                onValueChange={setRiskLevel}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservador</span>
                <span>Agresivo</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="model" className="mt-2 space-y-3">
            <div className="space-y-1">
              <Label htmlFor="prediction-model" className="text-xs">
                Modelo de predicción
              </Label>
              <Select value={predictionModel} onValueChange={setPredictionModel}>
                <SelectTrigger id="prediction-model" className="h-8 text-xs">
                  <SelectValue placeholder="Seleccionar modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Análisis técnico</SelectItem>
                  <SelectItem value="sentiment">Análisis de sentimiento</SelectItem>
                  <SelectItem value="hybrid">Híbrido (recomendado)</SelectItem>
                  <SelectItem value="deep">Aprendizaje profundo</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {predictionModel === "technical" && "Basado únicamente en indicadores técnicos y patrones de precio."}
                {predictionModel === "sentiment" && "Analiza noticias, redes sociales y sentimiento del mercado."}
                {predictionModel === "hybrid" &&
                  "Combina análisis técnico y de sentimiento para predicciones más balanceadas."}
                {predictionModel === "deep" && "Utiliza redes neuronales profundas para análisis avanzado de patrones."}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="data-timeframe" className="text-xs">
                Datos históricos a analizar
              </Label>
              <Select value={dataTimeframe} onValueChange={setDataTimeframe}>
                <SelectTrigger id="data-timeframe" className="h-8 text-xs">
                  <SelectValue placeholder="Seleccionar periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1w">1 semana</SelectItem>
                  <SelectItem value="1m">1 mes</SelectItem>
                  <SelectItem value="3m">3 meses</SelectItem>
                  <SelectItem value="1y">1 año</SelectItem>
                  <SelectItem value="all">Todo el histórico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-2 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="price-alerts" className="text-xs">
                  Alertas de precio
                </Label>
                <Switch id="price-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="trend-alerts" className="text-xs">
                  Alertas de cambio de tendencia
                </Label>
                <Switch id="trend-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="volume-alerts" className="text-xs">
                  Alertas de volumen anormal
                </Label>
                <Switch id="volume-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="news-alerts" className="text-xs">
                  Alertas de noticias importantes
                </Label>
                <Switch id="news-alerts" defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button size="sm" className="w-full text-xs">
          <Save className="h-3.5 w-3.5 mr-1" /> Guardar configuración
        </Button>
      </CardContent>
    </Card>
  )
}
