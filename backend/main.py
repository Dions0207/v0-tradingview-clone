from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, trading, data
import uvicorn

app = FastAPI(title="TradingView IQ Option API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, limitar a tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(trading.router, prefix="/api/trading", tags=["Trading"])
app.include_router(data.router, prefix="/api/data", tags=["Market Data"])

@app.get("/")
async def root():
    return {"message": "TradingView IQ Option API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
