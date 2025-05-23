"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BarChart4,
  Brain,
  Building,
  Clock,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  RefreshCw,
  DollarSign,
  Activity,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos simulados para los gráficos
const performanceData = [
  { date: "01/05", roi: 2.3, benchmark: 1.2 },
  { date: "02/05", roi: 3.1, benchmark: 1.8 },
  // ... otros datos
]

const tradesPerDayData = [
  { date: "15/05", trades: 12 },
  { date: "16/05", trades: 8 },
  { date: "17/05", trades: 15 },
  { date: "18/05", trades: 10 },
  { date: "19/05", trades: 7 },
  { date: "20/05", trades: 14 },
  { date: "21/05", trades: 9 },
]

const strategyPerformanceData = [
  { name: "Smart Money", value: 35 },
  { name: "Order Block", value: 25 },
  { name: "Wyckoff", value: 15 },
  { name: "Market Maker", value: 20 },
  { name: "Otros", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const marketPerformanceData = [
  { name: "Forex", win: 68, loss: 32 },
  { name: "Acciones", win: 72, loss: 28 },
  { name: "Cripto", win: 65, loss: 35 },
  { name: "Índices", win: 70, loss: 30 },
  { name: "Materias Primas", win: 62, loss: 38 },
]

// Datos de predicciones anticipadas
const upcomingEventsData = [
  {
    id: "ev001",
    event: "Reunión FED - Subida de Tipos",
    date: "28/05/2025",
    impact: "Alto",
    prediction: "Subida de 25 puntos básicos",
    confidence: 87,
    assets: ["USD", "Bonos", "S&P 500"],
    strategy: "Posición corta en S&P 500 antes del anuncio",
  },
  {
    id: "ev002",
    event: "Publicación NFP (Nóminas no agrícolas)",
    date: "03/06/2025",
    impact: "Alto",
    prediction: "Por debajo de expectativas",
    confidence: 72,
    assets: ["USD", "EUR/USD", "Oro"],
    strategy: "Posición larga en oro 24h antes del anuncio",
  },
  {
    id: "ev003",
    event: "Resultados Trimestrales NVIDIA",
    date: "05/06/2025",
    impact: "Medio",
    prediction: "Superará expectativas",
    confidence: 81,
    assets: ["NVDA", "Semiconductores", "NASDAQ"],
    strategy: "Posición larga en NVDA 48h antes del anuncio",
  },
  // ... otros eventos
]

export function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("1m")

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Panel de Administrador</h1>
          <p className="text-muted-foreground">Monitoreo y análisis de rendimiento de bots de trading</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1w">Última semana</SelectItem>
              <SelectItem value="1m">Último mes</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
              <SelectItem value="all">Todo el historial</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">ROI Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">+16.2%</div>
              <Badge className="bg-green-500">
                <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                +2.4%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. Benchmark +6.0%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Operaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">2,487</div>
              <Badge variant="outline">
                <Clock className="mr-1 h-3.5 w-3.5" />
                75 hoy
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Win Rate: 68.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Profit Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">2.45</div>
              <Badge className="bg-green-500">
                <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                +0.12
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Expectancy: 1.32R</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Max Drawdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">8.7%</div>
              <Badge className="bg-red-500">
                <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
                +1.2%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Sharpe Ratio: 1.85</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle>Predicciones de Eventos Futuros</CardTitle>
          <CardDescription>
            Eventos económicos y financieros anticipados por los bots de IA con estrategias recomendadas
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead>Predicción</TableHead>
                <TableHead className="text-right">Confianza</TableHead>
                <TableHead>Activos Afectados</TableHead>
                <TableHead>Estrategia Recomendada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingEventsData.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.event}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.impact === "Alto" ? "destructive" : event.impact === "Medio" ? "default" : "outline"
                      }
                    >
                      {event.impact}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.prediction}</TableCell>
                  <TableCell className="text-right">{event.confidence}%</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {event.assets.map((asset) => (
                        <Badge key={asset} variant="outline" className="text-xs">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={event.strategy}>
                    {event.strategy}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="bots">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="bots" className="text-sm">
              <Brain className="mr-1 h-4 w-4" />
              Bots
            </TabsTrigger>
            <TabsTrigger value="trades" className="text-sm">
              <BarChart3 className="mr-1 h-4 w-4" />
              Operaciones
            </TabsTrigger>
            <TabsTrigger value="risk" className="text-sm">
              <AlertTriangle className="mr-1 h-4 w-4" />
              Gestión de Riesgo
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="mr-1 h-3.5 w-3.5" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="mr-1 h-3.5 w-3.5" />
              Exportar
            </Button>
          </div>
        </div>

        <TabsContent value="bots" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Rendimiento de Bots</CardTitle>
              <CardDescription>Análisis detallado del rendimiento de cada bot</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bot</TableHead>
                    <TableHead>Estrategia</TableHead>
                    <TableHead>Mercados</TableHead>
                    <TableHead className="text-right">Win Rate</TableHead>
                    <TableHead className="text-right">ROI</TableHead>
                    <TableHead className="text-right">Operaciones</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SMC-001</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-blue-500 mr-1" />
                        Smart Money
                      </div>
                    </TableCell>
                    <TableCell>Forex, Índices</TableCell>
                    <TableCell className="text-right">68%</TableCell>
                    <TableCell className="text-right text-green-500">+87%</TableCell>
                    <TableCell className="text-right">342</TableCell>
                    <TableCell className="text-right">
                      <Badge>Activo</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Editar configuración</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Pausar bot</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">OB-LIQ-002</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 text-indigo-500 mr-1" />
                        Order Block
                      </div>
                    </TableCell>
                    <TableCell>Forex, Índices</TableCell>
                    <TableCell className="text-right">72%</TableCell>
                    <TableCell className="text-right text-green-500">+112%</TableCell>
                    <TableCell className="text-right">287</TableCell>
                    <TableCell className="text-right">
                      <Badge>Activo</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Editar configuración</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Pausar bot</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">WYCKOFF-003</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <BarChart4 className="h-4 w-4 text-purple-500 mr-1" />
                        Wyckoff
                      </div>
                    </TableCell>
                    <TableCell>Acciones, Índices</TableCell>
                    <TableCell className="text-right">65%</TableCell>
                    <TableCell className="text-right text-green-500">+76%</TableCell>
                    <TableCell className="text-right">198</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Pausado</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Editar configuración</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Pausar bot</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MM-004</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        Market Maker
                      </div>
                    </TableCell>
                    <TableCell>Forex, Índices</TableCell>
                    <TableCell className="text-right">74%</TableCell>
                    <TableCell className="text-right text-green-500">+145%</TableCell>
                    <TableCell className="text-right">412</TableCell>
                    <TableCell className="text-right">
                      <Badge>Activo</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Editar configuración</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Pausar bot</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Historial de Operaciones</CardTitle>
              <CardDescription>Últimas operaciones realizadas por los bots</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead>Activo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Salida</TableHead>
                    <TableHead className="text-right">Resultado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#12458</TableCell>
                    <TableCell>SMC-001</TableCell>
                    <TableCell>EUR/USD</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Compra</Badge>
                    </TableCell>
                    <TableCell>1.0865</TableCell>
                    <TableCell>1.0978</TableCell>
                    <TableCell className="text-right text-green-500">+1.04%</TableCell>
                    <TableCell>21/05/2025</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#12457</TableCell>
                    <TableCell>MM-004</TableCell>
                    <TableCell>BTC/USD</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">Venta</Badge>
                    </TableCell>
                    <TableCell>67,245</TableCell>
                    <TableCell>66,712</TableCell>
                    <TableCell className="text-right text-green-500">+0.79%</TableCell>
                    <TableCell>21/05/2025</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#12456</TableCell>
                    <TableCell>DEEP-007</TableCell>
                    <TableCell>AAPL</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Compra</Badge>
                    </TableCell>
                    <TableCell>178.72</TableCell>
                    <TableCell>182.45</TableCell>
                    <TableCell className="text-right text-green-500">+2.09%</TableCell>
                    <TableCell>20/05/2025</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gestión de Riesgo</CardTitle>
              <CardDescription>Análisis de exposición y riesgo por mercado y estrategia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Exposición por Mercado</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Forex</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "42%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Acciones</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "28%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Criptomonedas</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
