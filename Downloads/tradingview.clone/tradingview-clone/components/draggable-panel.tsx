"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { Move } from "lucide-react"

interface DraggablePanelProps {
  children: ReactNode
  initialPosition?: { x: number; y: number }
  className?: string
  zIndex?: number
}

export function DraggablePanel({
  children,
  initialPosition = { x: 20, y: 20 },
  className = "",
  zIndex = 10,
}: DraggablePanelProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)

  // Gestionar el arrastre del panel
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)

    // Calcular el desplazamiento entre la posición del ratón y la esquina del panel
    const rect = panelRef.current?.getBoundingClientRect()
    if (rect) {
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Gestionar también eventos táctiles para dispositivos móviles
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)

    const rect = panelRef.current?.getBoundingClientRect()
    if (rect) {
      setOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      })
    }
  }

  // Actualizar la posición durante el arrastre
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && panelRef.current) {
        // Calcular nueva posición basada en la posición del ratón y el desplazamiento
        const newX = e.clientX - offset.x
        const newY = e.clientY - offset.y

        // Obtener límites del contenedor padre
        const parentRect = panelRef.current.parentElement?.getBoundingClientRect()
        const panelRect = panelRef.current.getBoundingClientRect()

        if (parentRect) {
          // Asegurar que el panel no salga de los límites
          const maxX = parentRect.width - panelRect.width
          const maxY = parentRect.height - panelRect.height

          setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY)),
          })
        } else {
          setPosition({ x: newX, y: newY })
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && panelRef.current) {
        const newX = e.touches[0].clientX - offset.x
        const newY = e.touches[0].clientY - offset.y

        const parentRect = panelRef.current.parentElement?.getBoundingClientRect()
        const panelRect = panelRef.current.getBoundingClientRect()

        if (parentRect) {
          const maxX = parentRect.width - panelRect.width
          const maxY = parentRect.height - panelRect.height

          setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY)),
          })
        } else {
          setPosition({ x: newX, y: newY })
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    // Agregar event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      // Limpiar event listeners al desmontar
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, offset])

  // Ajustar posición inicial cuando el componente se monta
  useEffect(() => {
    const adjustInitialPosition = () => {
      if (panelRef.current && panelRef.current.parentElement) {
        const parentRect = panelRef.current.parentElement.getBoundingClientRect()
        const panelRect = panelRef.current.getBoundingClientRect()

        // Asegurar que la posición inicial no hace que el panel quede fuera de límites
        const maxX = parentRect.width - panelRect.width
        const maxY = parentRect.height - panelRect.height

        setPosition({
          x: Math.max(0, Math.min(initialPosition.x, maxX)),
          y: Math.max(0, Math.min(initialPosition.y, maxY)),
        })
      }
    }

    adjustInitialPosition()

    // También ajustar cuando la ventana cambia de tamaño
    window.addEventListener("resize", adjustInitialPosition)

    return () => {
      window.removeEventListener("resize", adjustInitialPosition)
    }
  }, [initialPosition])

  return (
    <div
      ref={panelRef}
      className={`absolute ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex,
        transition: isDragging ? "none" : "box-shadow 0.2s",
        boxShadow: isDragging ? "0 10px 25px -5px rgba(0, 0, 0, 0.2)" : "",
        maxWidth: "90vw",
      }}
    >
      <div
        className="p-1 cursor-move flex items-center justify-center rounded-t-md bg-muted/30 hover:bg-muted/50"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <Move className="h-4 w-4 text-muted-foreground" />
      </div>
      {children}
    </div>
  )
}
