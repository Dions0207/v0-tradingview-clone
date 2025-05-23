"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MarketOverview() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`border-l border-border bg-background flex flex-col ${collapsed ? "w-12" : "w-72"}`}>
      <div className="flex items-center justify-between p-2 h-10 border-b border-border">
        {!collapsed && <span className="text-sm font-medium">Resumen de mercado</span>}
        <Button
          variant="ghost"
          size="icon"
          className={`h-6 w-6 ${collapsed ? "mx-auto" : "ml-auto"}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {!collapsed ? (
        <div className="flex flex-col flex-1">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar activos..." className="pl-8 h-8 text-xs" />
            </div>
          </div>

          <Tabs defaultValue="stocks" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-4 h-9 px-2 py-1 bg-transparent">
              <TabsTrigger value="stocks" className="text-xs h-7">
                Acciones
              </TabsTrigger>
              <TabsTrigger value="forex" className="text-xs h-7">
                Forex
              </TabsTrigger>
              <TabsTrigger value="crypto" className="text-xs h-7">
                Cripto
              </TabsTrigger>
              <TabsTrigger value="indices" className="text-xs h-7">
                Índices
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stocks" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left font-medium p-1">Símbolo</th>
                        <th className="text-right font-medium p-1">Último</th>
                        <th className="text-right font-medium p-1">Cambio %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">AAPL</td>
                        <td className="text-right p-1">178.72</td>
                        <td className="text-right p-1 text-green-500">+1.24%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">MSFT</td>
                        <td className="text-right p-1">417.15</td>
                        <td className="text-right p-1 text-red-500">-0.32%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">GOOGL</td>
                        <td className="text-right p-1">175.98</td>
                        <td className="text-right p-1 text-green-500">+0.87%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">AMZN</td>
                        <td className="text-right p-1">182.41</td>
                        <td className="text-right p-1 text-green-500">+1.56%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">META</td>
                        <td className="text-right p-1">478.22</td>
                        <td className="text-right p-1 text-green-500">+0.92%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">TSLA</td>
                        <td className="text-right p-1">177.58</td>
                        <td className="text-right p-1 text-red-500">-2.14%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">NVDA</td>
                        <td className="text-right p-1">950.02</td>
                        <td className="text-right p-1 text-green-500">+3.45%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">JPM</td>
                        <td className="text-right p-1">198.45</td>
                        <td className="text-right p-1 text-green-500">+0.23%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">V</td>
                        <td className="text-right p-1">275.32</td>
                        <td className="text-right p-1 text-red-500">-0.18%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">WMT</td>
                        <td className="text-right p-1">68.92</td>
                        <td className="text-right p-1 text-green-500">+0.54%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="forex" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left font-medium p-1">Par</th>
                        <th className="text-right font-medium p-1">Último</th>
                        <th className="text-right font-medium p-1">Cambio %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">EUR/USD</td>
                        <td className="text-right p-1">1.0865</td>
                        <td className="text-right p-1 text-green-500">+0.12%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">GBP/USD</td>
                        <td className="text-right p-1">1.2715</td>
                        <td className="text-right p-1 text-red-500">-0.08%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">USD/JPY</td>
                        <td className="text-right p-1">156.78</td>
                        <td className="text-right p-1 text-green-500">+0.25%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">USD/CHF</td>
                        <td className="text-right p-1">0.9045</td>
                        <td className="text-right p-1 text-red-500">-0.15%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">AUD/USD</td>
                        <td className="text-right p-1">0.6612</td>
                        <td className="text-right p-1 text-green-500">+0.32%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">USD/CAD</td>
                        <td className="text-right p-1">1.3642</td>
                        <td className="text-right p-1 text-red-500">-0.18%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">NZD/USD</td>
                        <td className="text-right p-1">0.6025</td>
                        <td className="text-right p-1 text-green-500">+0.21%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="crypto" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left font-medium p-1">Cripto</th>
                        <th className="text-right font-medium p-1">Precio</th>
                        <th className="text-right font-medium p-1">Cambio %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">BTC/USD</td>
                        <td className="text-right p-1">67,245</td>
                        <td className="text-right p-1 text-green-500">+2.34%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">ETH/USD</td>
                        <td className="text-right p-1">3,178</td>
                        <td className="text-right p-1 text-red-500">-0.85%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">XRP/USD</td>
                        <td className="text-right p-1">0.5123</td>
                        <td className="text-right p-1 text-green-500">+1.24%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">SOL/USD</td>
                        <td className="text-right p-1">142.87</td>
                        <td className="text-right p-1 text-green-500">+3.56%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">ADA/USD</td>
                        <td className="text-right p-1">0.4512</td>
                        <td className="text-right p-1 text-red-500">-0.32%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">DOT/USD</td>
                        <td className="text-right p-1">6.78</td>
                        <td className="text-right p-1 text-green-500">+1.87%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">DOGE/USD</td>
                        <td className="text-right p-1">0.1234</td>
                        <td className="text-right p-1 text-green-500">+5.67%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="indices" className="flex-1 p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left font-medium p-1">Índice</th>
                        <th className="text-right font-medium p-1">Valor</th>
                        <th className="text-right font-medium p-1">Cambio %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">S&P 500</td>
                        <td className="text-right p-1">5,235</td>
                        <td className="text-right p-1 text-green-500">+0.45%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">NASDAQ</td>
                        <td className="text-right p-1">16,780</td>
                        <td className="text-right p-1 text-red-500">-0.12%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">DOW</td>
                        <td className="text-right p-1">39,125</td>
                        <td className="text-right p-1 text-green-500">+0.28%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">FTSE 100</td>
                        <td className="text-right p-1">8,142</td>
                        <td className="text-right p-1 text-green-500">+0.32%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">DAX</td>
                        <td className="text-right p-1">18,456</td>
                        <td className="text-right p-1 text-red-500">-0.18%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">NIKKEI</td>
                        <td className="text-right p-1">38,789</td>
                        <td className="text-right p-1 text-green-500">+1.24%</td>
                      </tr>
                      <tr className="hover:bg-muted/50 cursor-pointer">
                        <td className="p-1">HANG SENG</td>
                        <td className="text-right p-1">17,245</td>
                        <td className="text-right p-1 text-red-500">-0.87%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex flex-col items-center py-2 space-y-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
