"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowUpDown,
  Bell,
  Brain,
  ChevronDown,
  ChevronUp,
  Clock,
  Cog,
  Layers,
  MessageSquare,
  Percent,
  Plus,
  Webhook,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export function ToolsPanel() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className={`border-t border-border bg-background ${expanded ? "h-48" : "h-10"}`}>
      <div className="flex items-center justify-between px-2 h-10 border-b border-border">
        <Tabs defaultValue="indicators" className="w-full h-10">
          <TabsList className="h-full bg-transparent">
            <TabsTrigger value="indicators" className="text-xs h-7 px-3">
              <Layers className="mr-1 h-3.5 w-3.5" />
              Indicadores
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs h-7 px-3">
              <Bell className="mr-1 h-3.5 w-3.5" />
              Alertas
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="text-xs h-7 px-3">
              <Webhook className="mr-1 h-3.5 w-3.5" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-xs h-7 px-3">
              <Brain className="mr-1 h-3.5 w-3.5" />
              IA
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs h-7 px-3">
              <MessageSquare className="mr-1 h-3.5 w-3.5" />
              Chat
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {expanded && (
        <Tabs defaultValue="indicators" className="p-4">
          <TabsContent value="indicators" className="m-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Indicadores aplicados</h3>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Plus className="mr-1 h-3.5 w-3.5" />
                Añadir indicador
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div>
                  <h4 className="text-xs font-medium">Media Móvil (EMA)</h4>
                  <p className="text-xs text-muted-foreground">Período: 20, Color: Azul</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Cog className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div>
                  <h4 className="text-xs font-medium">RSI</h4>
                  <p className="text-xs text-muted-foreground">Período: 14, Sobrecompra: 70, Sobreventa: 30</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Cog className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="m-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Alertas configuradas</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Nueva alerta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear nueva alerta</DialogTitle>
                    <DialogDescription>
                      Configura una alerta para recibir notificaciones cuando se cumplan ciertas condiciones.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="symbol">Símbolo</Label>
                      <Input id="symbol" value="AAPL" readOnly />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="condition">Condición</Label>
                      <Select defaultValue="price-above">
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Seleccionar condición" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-above">Precio por encima de</SelectItem>
                          <SelectItem value="price-below">Precio por debajo de</SelectItem>
                          <SelectItem value="price-change">Cambio de precio (%)</SelectItem>
                          <SelectItem value="volume">Volumen por encima de</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="value">Valor</Label>
                      <div className="flex items-center gap-2">
                        <Input id="value" type="number" placeholder="180.00" />
                        <div className="flex items-center gap-1">
                          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                          <Percent className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="expiration">Expiración</Label>
                      <Select defaultValue="never">
                        <SelectTrigger id="expiration">
                          <SelectValue placeholder="Seleccionar expiración" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Nunca</SelectItem>
                          <SelectItem value="1d">1 día</SelectItem>
                          <SelectItem value="1w">1 semana</SelectItem>
                          <SelectItem value="1m">1 mes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor="webhook" className="flex-1">
                        Enviar a webhook
                      </Label>
                      <Switch id="webhook" />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit">Crear alerta</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-orange-500" />
                  <div>
                    <h4 className="text-xs font-medium">AAPL por encima de $180.00</h4>
                    <p className="text-xs text-muted-foreground">Creada hace 2 días · No expira</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Cog className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="m-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Webhooks configurados</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Nuevo webhook
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configurar nuevo webhook</DialogTitle>
                    <DialogDescription>
                      Los webhooks permiten enviar notificaciones a servicios externos cuando se activan alertas.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" placeholder="Mi webhook" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" placeholder="https://ejemplo.com/webhook" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="headers">Cabeceras (opcional)</Label>
                      <Input id="headers" placeholder="Authorization: Bearer token123" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor="active" className="flex-1">
                        Activo
                      </Label>
                      <Switch id="active" defaultChecked />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit">Guardar webhook</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <Webhook className="h-4 w-4 mr-2 text-blue-500" />
                  <div>
                    <h4 className="text-xs font-medium">Discord Alerts</h4>
                    <p className="text-xs text-muted-foreground">https://discord.com/api/webhooks/...</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Clock className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Cog className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="m-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Análisis de Inteligencia Artificial</h3>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Brain className="mr-1 h-3.5 w-3.5" />
                Configurar IA
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-muted/50 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-medium">Predicción actual</h4>
                  <Badge variant="outline" className="text-xs">
                    AAPL
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="text-xs">Alcista (78% probabilidad)</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Basado en 24 indicadores técnicos</p>
              </div>

              <div className="p-2 bg-muted/50 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-medium">Sentimiento</h4>
                  <Badge variant="outline" className="text-xs">
                    General
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="text-xs">Neutral (actualizado hace 5m)</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Análisis de noticias y redes sociales</p>
              </div>

              <div className="p-2 bg-muted/50 rounded-md col-span-2">
                <h4 className="text-xs font-medium mb-1">Niveles clave detectados</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Soporte 1:</span>
                    <span className="text-xs">175.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Resistencia 1:</span>
                    <span className="text-xs">181.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Soporte 2:</span>
                    <span className="text-xs">172.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Resistencia 2:</span>
                    <span className="text-xs">185.75</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              <Button variant="link" size="sm" className="h-6 text-xs">
                Ver análisis completo
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="m-0">
            <div className="flex flex-col h-[120px]">
              <div className="flex-1 bg-muted/50 rounded-md p-2 overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="bg-primary/10 rounded-md p-1.5 text-xs max-w-[80%]">
                      <p className="font-medium text-[10px] text-muted-foreground">Sistema</p>
                      <p>Bienvenido al chat de TradingView. Aquí puedes discutir sobre AAPL con otros traders.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-primary/20 rounded-md p-1.5 text-xs max-w-[80%]">
                      <p className="font-medium text-[10px] text-primary">Tú</p>
                      <p>¿Alguien tiene un análisis sobre AAPL después de los resultados?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Input placeholder="Escribe un mensaje..." className="h-8 text-xs" />
                <Button size="sm" className="h-8">
                  Enviar
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
