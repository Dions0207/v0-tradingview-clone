"use client"

import { useState } from "react"
import {
  Brain,
  Building,
  BarChart4,
  DollarSign,
  FileText,
  Activity,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Zap,
  Clock,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function TradingBots() {
  const [activeBot, setActiveBot] = useState<string | null>(null)

  const bots = [
    {
      id: "smc-001",
      name: "Smart Money Concepts",
      icon: Building,
      description: "Estrategia basada en el seguimiento de los movimientos del dinero inteligente institucional",
      roi: 87,
      winRate: 68,
      trades: 342,
      status: "active",
      color: "blue",
    },
    {
      id: "ob-liq-002",
      name: "Order Block & Liquidity",
      icon: Activity,
      description: "Identifica bloques de órdenes y zonas de liquidez para entradas precisas",
      roi: 112,
      winRate: 72,
      trades: 287,
      status: "active",
      color: "indigo",
    },
    {
      id: "wyckoff-003",
      name: "Método Wyckoff",
      icon: BarChart4,
      description: "Basado en la metodología clásica de Richard Wyckoff para identificar ciclos de mercado",
      roi: 76,
      winRate: 65,
      trades: 198,
      status: "paused",
      color: "purple",
    },
    {
      id: "mm-004",
      name: "Market Maker",
      icon: DollarSign,
      description: "Replica las estrategias de los creadores de mercado para anticipar movimientos",
      roi: 145,
      winRate: 74,
      trades: 412,
      status: "active",
      color: "green",
    },
    {
      id: "hedge-005",
      name: "Hedge Fund",
      icon: FileText,
      description: "Replica estrategias utilizadas por fondos de cobertura de élite",
      roi: 68,
      winRate: 62,
      trades: 156,
      status: "inactive",
      color: "amber",
    },
    {
      id: "deep-007",
      name: "Deep Learning",
      icon: Brain,
      description: "Utiliza redes neuronales profundas para predecir movimientos de mercado",
      roi: 94,
      winRate: 67,
      trades: 523,
      status: "active",
      color: "cyan",
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bots de Trading IA</h1>
          <p className="text-muted-foreground">Estrategias institucionales automatizadas con inteligencia artificial</p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Crear Nuevo Bot
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="paused">Pausados</TabsTrigger>
            <TabsTrigger value="inactive">Inactivos</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Rendimiento
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot) => {
              const Icon = bot.icon
              return (
                <Card key={bot.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`mr-2 p-1.5 rounded-md bg-${bot.color}-100 text-${bot.color}-500`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle>{bot.name}</CardTitle>
                      </div>
                      <Badge
                        variant={
                          bot.status === "active" ? "default" : bot.status === "paused" ? "outline" : "secondary"
                        }
                      >
                        {bot.status === "active" ? "Activo" : bot.status === "paused" ? "Pausado" : "Inactivo"}
                      </Badge>
                    </div>
                    <CardDescription>{bot.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">+{bot.roi}%</div>
                        <div className="text-xs text-muted-foreground">ROI</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{bot.winRate}%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{bot.trades}</div>
                        <div className="text-xs text-muted-foreground">Operaciones</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rendimiento último mes</span>
                        <span className="font-medium text-green-500">+{Math.floor(bot.roi * 0.12)}%</span>
                      </div>
                      <Progress value={Math.floor(bot.roi * 0.12)} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </Button>
                    <Button size="sm" onClick={() => setActiveBot(bot.id)}>
                      Detalles
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots
              .filter((bot) => bot.status === "active")
              .map((bot) => {
                const Icon = bot.icon
                return (
                  <Card key={bot.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className={`mr-2 p-1.5 rounded-md bg-${bot.color}-100 text-${bot.color}-500`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <CardTitle>{bot.name}</CardTitle>
                        </div>
                        <Badge>Activo</Badge>
                      </div>
                      <CardDescription>{bot.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">+{bot.roi}%</div>
                          <div className="text-xs text-muted-foreground">ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{bot.winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{bot.trades}</div>
                          <div className="text-xs text-muted-foreground">Operaciones</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rendimiento último mes</span>
                          <span className="font-medium text-green-500">+{Math.floor(bot.roi * 0.12)}%</span>
                        </div>
                        <Progress value={Math.floor(bot.roi * 0.12)} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configurar
                      </Button>
                      <Button size="sm" onClick={() => setActiveBot(bot.id)}>
                        Detalles
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        {/* Contenido similar para las otras pestañas */}
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Rendimiento Histórico</CardTitle>
            <CardDescription>Comparativa de rendimiento entre estrategias</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/20">
            <div className="text-center p-4">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Gráfico de Rendimiento</h3>
              <p className="text-sm text-muted-foreground">
                Aquí se mostraría un gráfico detallado del rendimiento histórico de los bots
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Operaciones</CardTitle>
            <CardDescription>Operaciones planificadas por los bots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-500 p-1.5 rounded-md">
                  <Building className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">EUR/USD</h4>
                    <Badge className="bg-green-500">Compra</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Smart Money Concepts</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Confianza: 87%</span>
                    <span className="flex items-center text-green-500">
                      <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                      +1.2%
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 text-indigo-500 p-1.5 rounded-md">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">BTC/USD</h4>
                    <Badge className="bg-red-500">Venta</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Order Block & Liquidity</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Confianza: 82%</span>
                    <span className="flex items-center text-red-500">
                      <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                      -2.4%
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-500 p-1.5 rounded-md">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">S&P 500</h4>
                    <Badge className="bg-green-500">Compra</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Market Maker</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Confianza: 78%</span>
                    <span className="flex items-center text-green-500">
                      <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                      +0.8%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Clock className="mr-2 h-4 w-4" />
              Ver todas las operaciones planificadas
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
