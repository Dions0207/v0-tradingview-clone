import json
import logging
import asyncio
from typing import Dict, List, Set
from fastapi import WebSocket, WebSocketDisconnect

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
        self.user_connections: Dict[str, Set[str]] = {}
        
    async def connect(self, websocket: WebSocket, client_id: str, user_id: str = None):
        await websocket.accept()
        
        if client_id not in self.active_connections:
            self.active_connections[client_id] = []
        
        self.active_connections[client_id].append(websocket)
        
        if user_id:
            if user_id not in self.user_connections:
                self.user_connections[user_id] = set()
            
            self.user_connections[user_id].add(client_id)
            
        logger.info(f"Cliente {client_id} conectado. Total de conexiones: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket, client_id: str, user_id: str = None):
        if client_id in self.active_connections:
            if websocket in self.active_connections[client_id]:
                self.active_connections[client_id].remove(websocket)
                
            if not self.active_connections[client_id]:
                del self.active_connections[client_id]
                
                # Eliminar referencia del usuario si existe
                if user_id and user_id in self.user_connections:
                    if client_id in self.user_connections[user_id]:
                        self.user_connections[user_id].remove(client_id)
                    
                    if not self.user_connections[user_id]:
                        del self.user_connections[user_id]
                        
        logger.info(f"Cliente {client_id} desconectado. Total de conexiones: {len(self.active_connections)}")
    
    async def send_personal_message(self, message: dict, client_id: str):
        if client_id in self.active_connections:
            for connection in self.active_connections[client_id]:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    logger.error(f"Error al enviar mensaje a {client_id}: {str(e)}")
    
    async def send_user_message(self, message: dict, user_id: str):
        if user_id in self.user_connections:
            for client_id in self.user_connections[user_id]:
                await self.send_personal_message(message, client_id)
    
    async def broadcast(self, message: dict):
        for client_id in list(self.active_connections.keys()):
            await self.send_personal_message(message, client_id)

# Instancia global del gestor de conexiones
manager = ConnectionManager()
