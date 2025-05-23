from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Dict, Optional
from utils.iq_option_client import iq_client

router = APIRouter()

class CandleData(BaseModel):
    from_time: int
    to_time: int
    open: float
    close: float
    high: float
    low: float
    volume: int

@router.get("/candles/{asset}")
async def get_candles(asset: str, timeframe: int = 60, count: int = 100):
    """Obtener velas para un activo"""
    if not iq_client.check_connection():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No conectado a IQ Option",
        )
        
    candles = await iq_client.get_candles(asset, timeframe, count)
    
    if not candles:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se pudieron obtener velas para {asset}",
        )
        
    return {"asset": asset, "timeframe": timeframe, "candles": candles}

@router.get("/assets")
async def get_available_assets():
    """Obtener lista de activos disponibles"""
    if not iq_client.check_connection():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No conectado a IQ Option",
        )
    
    # Esta función requeriría implementación adicional en el cliente de IQ Option
    return {"message": "Función no implementada"}