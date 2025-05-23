from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
import asyncio
from utils.iq_option_client import iq_client
from utils.websocket_manager import manager

router = APIRouter()

class TradeRequest(BaseModel):
    asset: str
    amount: float
    direction: str  # "call" o "put"
    expiration: int  # en segundos

class TradeResponse(BaseModel):
    success: bool
    message: str = None
    order_id: str = None
    asset: str = None
    direction: str = None
    amount: float = None
    expiration: int = None

@router.post("/execute", response_model=TradeResponse)
async def execute_trade(request: TradeRequest):
    """Ejecutar una operación de trading"""
    if not iq_client.check_connection():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No conectado a IQ Option",
        )
        
    result = await iq_client.buy_option(
        request.asset, 
        request.amount, 
        request.direction, 
        request.expiration
    )
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Error al ejecutar la operación"),
        )
        
    # Iniciar tarea en segundo plano para verificar resultado
    asyncio.create_task(check_and_notify_result(result["order_id"]))
        
    return result

async def check_and_notify_result(order_id: str):
    """Verificar resultado de la operación y notificar por WebSocket"""
    result = await iq_client.check_order_result(order_id)
    
    # Notificar a todos los clientes conectados
    await manager.broadcast({
        "type": "trade_result",
        "data": result
    })

@router.get("/history")
async def get_trade_history():
    """Obtener historial de operaciones"""
    if not iq_client.check_connection():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No conectado a IQ Option",
        )
    
    # Esta función requeriría implementación adicional en el cliente de IQ Option
    return {"message": "Función no implementada"}

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    """Endpoint WebSocket para recibir actualizaciones en tiempo real"""
    await manager.connect(websocket, client_id)
    
    try:
        while True:
            # Esperar mensajes del cliente
            data = await websocket.receive_text()
            
            # Procesar mensajes si es necesario
            # ...
            
            # Enviar respuesta de confirmación
            await websocket.send_json({"status": "received"})
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, client_id)