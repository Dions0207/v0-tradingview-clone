"use client"

import { useState } from "react"
import {
  ArrowLeftRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  LineChart,
  List,
  Plus,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`border-r border-border bg-background flex flex-col ${collapsed ? "w-12" : "w-60"}`}>
      <div className="flex items-center justify-between p-2 h-10 border-b border-border">
        {!collapsed && <span className="text-sm font-medium">Explorador</span>}
        <Button
          variant="ghost"
          size="icon"
          className={`h-6 w-6 ${collapsed ? "mx-auto" : "ml-auto"}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {!collapsed ? (
        <Tabs defaultValue="symbols" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 h-9 px-2 py-1 bg-transparent">
            <TabsTrigger value="symbols" className="text-xs h-7">
              Símbolos
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="text-xs h-7">
              Listas
            </TabsTrigger>
            <TabsTrigger value="news" className="text-xs h-7">
              Noticias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="symbols" className="flex-1 flex flex-col p-0 m-0">
            <div className="p-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Compass className="mr-2 h-3.5 w-3.5" />
                Explorar mercados
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-medium">Acciones</h3>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      AAPL <span className="ml-auto text-green-500">178.72</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      MSFT <span className="ml-auto text-red-500">417.15</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      GOOGL <span className="ml-auto text-green-500">175.98</span>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-medium">Forex</h3>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      EUR/USD <span className="ml-auto text-green-500">1.0865</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      GBP/USD <span className="ml-auto text-red-500">1.2715</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      USD/JPY <span className="ml-auto text-green-500">156.78</span>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-medium">Criptomonedas</h3>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      BTC/USD <span className="ml-auto text-green-500">67,245</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      ETH/USD <span className="ml-auto text-red-500">3,178</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      XRP/USD <span className="ml-auto text-green-500">0.5123</span>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-medium">Índices</h3>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      S&P 500 <span className="ml-auto text-green-500">5,235</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      NASDAQ <span className="ml-auto text-red-500">16,780</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                      DOW <span className="ml-auto text-green-500">39,125</span>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="watchlist" className="flex-1 flex flex-col p-0 m-0">
            <div className="p-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Plus className="mr-2 h-3.5 w-3.5" />
                Nueva lista
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                  <Star className="mr-2 h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                  Favoritos
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                  <List className="mr-2 h-3.5 w-3.5" />
                  Tecnología
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                  <List className="mr-2 h-3.5 w-3.5" />
                  Criptomonedas
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
                  <List className="mr-2 h-3.5 w-3.5" />
                  Forex
                </Button>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="news" className="flex-1 p-0 m-0">
            <ScrollArea className="h-full">
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-medium">AAPL: Apple presenta nuevos MacBooks con chips M3</h3>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <h3 className="text-xs font-medium">BTC: Bitcoin supera los $67,000 tras aprobación de ETF</h3>
                  <p className="text-xs text-muted-foreground">Hace 4 horas</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <h3 className="text-xs font-medium">EUR/USD: El euro se fortalece tras datos económicos</h3>
                  <p className="text-xs text-muted-foreground">Hace 5 horas</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center py-2 space-y-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LineChart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
