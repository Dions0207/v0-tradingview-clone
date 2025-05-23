import { ChartEnhanced } from "@/components/chart-enhanced"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TradingBots } from "@/components/trading-bots"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-auto">
          <Tabs defaultValue="chart" className="flex-1">
            <div className="border-b px-4 py-2">
              <TabsList>
                <TabsTrigger value="chart">Gráficos</TabsTrigger>
                <TabsTrigger value="bots">Bots IA</TabsTrigger>
                <TabsTrigger value="admin">Panel Admin</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chart" className="flex-1 p-0 m-0 h-full">
              <div className="h-full">
                <ChartEnhanced />
              </div>
            </TabsContent>

            <TabsContent value="bots" className="flex-1 p-0 m-0 overflow-auto">
              <div className="p-4">
                <TradingBots />
              </div>
            </TabsContent>

            <TabsContent value="admin" className="flex-1 p-0 m-0 overflow-auto">
              <AdminDashboard />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
