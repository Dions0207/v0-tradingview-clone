"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="p-4 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="home">Página Principal</TabsTrigger>
            <TabsTrigger value="bots">Bots IA</TabsTrigger>
            <TabsTrigger value="admin">Panel Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative w-full overflow-hidden rounded-md">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80 z-10">
                    <div className="text-center p-4 max-w-md">
                      <h2 className="text-2xl font-bold mb-2">Página Principal</h2>
                      <p className="mb-4">
                        Vista de gráficos avanzados con análisis técnico e integración con IQ Option
                      </p>
                      <Button onClick={() => setActiveTab("bots")}>Ver Bots IA</Button>
                    </div>
                  </div>
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Vista principal de TradingView"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Características principales:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Gráficos avanzados con múltiples timeframes</li>
                      <li>Indicadores técnicos personalizables</li>
                      <li>Integración con IQ Option para trading</li>
                      <li>Análisis de IA en tiempo real</li>
                      <li>Predicciones de movimientos futuros</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Mercados disponibles:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Forex (pares de divisas)</li>
                      <li>Acciones globales</li>
                      <li>Criptomonedas</li>
                      <li>Índices bursátiles</li>
                      <li>Materias primas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bots" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative w-full overflow-hidden rounded-md">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80 z-10">
                    <div className="text-center p-4 max-w-md">
                      <h2 className="text-2xl font-bold mb-2">Bots de Trading IA</h2>
                      <p className="mb-4">Estrategias institucionales automatizadas con IA avanzada</p>
                      <Button onClick={() => setActiveTab("admin")}>Ver Panel Admin</Button>
                    </div>
                  </div>
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Bots de Trading IA"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Estrategias disponibles:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Smart Money Concepts (SMC)</li>
                      <li>Order Block & Liquidity</li>
                      <li>Método Wyckoff</li>
                      <li>Market Maker Strategy</li>
                      <li>Replicación de Fondos de Cobertura</li>
                      <li>Política Monetaria</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Características de los bots:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Análisis predictivo de eventos económicos</li>
                      <li>Detección de manipulación de mercado</li>
                      <li>Gestión avanzada de riesgo</li>
                      <li>Adaptación a condiciones cambiantes</li>
                      <li>Backtesting con datos históricos</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative w-full overflow-hidden rounded-md">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80 z-10">
                    <div className="text-center p-4 max-w-md">
                      <h2 className="text-2xl font-bold mb-2">Panel de Administrador</h2>
                      <p className="mb-4">Monitoreo completo del rendimiento de los bots y predicciones avanzadas</p>
                      <Button onClick={() => setActiveTab("home")}>Volver al Inicio</Button>
                    </div>
                  </div>
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Panel de Administrador"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Métricas principales:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ROI total: +16.2% (vs Benchmark +6.0%)</li>
                      <li>Operaciones totales: 2,487</li>
                      <li>Win Rate: 68.5%</li>
                      <li>Profit Factor: 2.45</li>
                      <li>Max Drawdown: 8.7%</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Predicciones de eventos:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Reunión FED - Subida de Tipos (28/05)</li>
                      <li>Publicación NFP (03/06)</li>
                      <li>Resultados Trimestrales NVIDIA (05/06)</li>
                      <li>Decisión BCE sobre Tipos (10/06)</li>
                      <li>Datos de Inflación IPC EE.UU. (12/06)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
