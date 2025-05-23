"use client"

import { useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

interface PanelContainerProps {
  children: ReactNode
  title?: string
  defaultCollapsed?: boolean
  position?: "left" | "right"
  width?: string
}

export function PanelContainer({
  children,
  title = "Panel",
  defaultCollapsed = false,
  position = "left",
  width = "w-72",
}: PanelContainerProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div
      className={`border-${position === "left" ? "r" : "l"} border-border bg-background flex flex-col ${collapsed ? "w-12" : width}`}
    >
      <div className="flex items-center justify-between p-2 h-10 border-b border-border">
        {!collapsed && <span className="text-sm font-medium">{title}</span>}
        <Button
          variant="ghost"
          size="icon"
          className={`h-6 w-6 ${collapsed ? "mx-auto" : "ml-auto"}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            position === "left" ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )
          ) : position === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!collapsed && <div className="flex-1 overflow-auto">{children}</div>}
    </div>
  )
}
