# TradingView Clone con IQ Option Integration

Este proyecto es un clon de TradingView con integración a IQ Option, que incluye:

## Características

- Frontend en Next.js con gráficos interactivos
- Backend en FastAPI para la conexión con IQ Option
- Análisis técnico con indicadores
- Bots de trading con IA
- Panel de administración

## Estructura del Proyecto

- `/` - Frontend Next.js
  - `/app` - Páginas y componentes de la aplicación
  - `/components` - Componentes reutilizables
  - `/lib` - Utilidades y funciones auxiliares
  - `/public` - Archivos estáticos

- `/backend` - API FastAPI para IQ Option
  - `/api` - Código de la API
  - `/routes` - Rutas de la API
  - `/utils` - Utilidades y cliente de IQ Option
  - `/models` - Modelos de datos

## Instalación

### Frontend
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev