"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  Clock,
  CreditCard,
  Globe,
  HelpCircle,
  LineChart,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background z-10">
      <div className="flex items-center h-14 px-4">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link href="/" className="flex items-center mr-6">
          <LineChart className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-lg font-bold hidden sm:inline-block">TradingView</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2">
                Mercados <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Acciones</DropdownMenuItem>
              <DropdownMenuItem>Forex</DropdownMenuItem>
              <DropdownMenuItem>Criptomonedas</DropdownMenuItem>
              <DropdownMenuItem>Futuros</DropdownMenuItem>
              <DropdownMenuItem>Índices</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2">
                Gráficos <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Gráfico avanzado</DropdownMenuItem>
              <DropdownMenuItem>Gráfico ligero</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mis gráficos guardados</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2">
                Screener <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>Screener de acciones</DropdownMenuItem>
              <DropdownMenuItem>Screener de forex</DropdownMenuItem>
              <DropdownMenuItem>Screener de criptomonedas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="h-8 px-2">
            Comunidad
          </Button>

          <Button variant="ghost" className="h-8 px-2">
            Indicadores
          </Button>

          <Button variant="ghost" className="h-8 px-2" asChild>
            <Link href="/bots">Bots IA</Link>
          </Button>

          <Button variant="ghost" className="h-8 px-2" asChild>
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>

        <div className="relative flex-1 max-w-md mx-4 hidden sm:block">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar mercados, activos, indicadores..."
            className="pl-8 h-9 bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center ml-auto space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Search className="h-5 w-5 sm:hidden" />
                  <Clock className="h-5 w-5 hidden sm:block" />
                  <span className="sr-only">Historial</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Historial</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Alertas</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Alertas</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Mensajes</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mensajes</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                  <HelpCircle className="h-5 w-5" />
                  <span className="sr-only">Ayuda</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ayuda</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Idioma</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
              <DropdownMenuItem>中文</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 gap-1 hidden md:flex">
                <CreditCard className="h-4 w-4" />
                <span>Gratis</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Plan Básico</DropdownMenuItem>
              <DropdownMenuItem>Plan Pro</DropdownMenuItem>
              <DropdownMenuItem>Plan Premium</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">TV</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
