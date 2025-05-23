import os
import time
import logging
from typing import Dict, List, Optional, Union
from iqoptionapi.stable_api import IQ_Option

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class IQOptionClient:
    def __init__(self):
        self.client = None
        self.connected = False
        self.email = None
        self.balance_type = "PRACTICE"  # or "REAL"
        
    async def connect(self, email: str, password: str) -> bool:
        """Conectar a IQ Option"""
        try:
            self.client = IQ_Option(email, password)
            status, reason = self.client.connect()
            
            if status:
                logger.info(f"Conectado a IQ Option como {email}")
                self.connected = True
                self.email = email
                self.client.change_balance(self.balance_type)
                return True
            else:
                logger.error(f"Error al conectar a IQ Option: {reason}")
                return False
        except Exception as e:
            logger.error(f"Excepción al conectar a IQ Option: {str(e)}")
            return False
    
    def check_connection(self) -> bool:
        """Verificar si la conexión está activa"""
        if not self.client:
            return False
        return self.client.check_connect()
    
    def set_balance_type(self, balance_type: str) -> bool:
        """Cambiar tipo de balance (PRACTICE/REAL)"""
        if balance_type not in ["PRACTICE", "REAL"]:
            return False
        
        if not self.check_connection():
            return False
            
        self.balance_type = balance_type
        self.client.change_balance(balance_type)
        return True
    
    async def get_balance(self) -> float:
        """Obtener balance actual"""
        if not self.check_connection():
            return 0.0
        return self.client.get_balance()
    
    async def get_candles(self, asset: str, timeframe: int, count: int) -> List[Dict]:
        """Obtener velas para un activo"""
        if not self.check_connection():
            return []
            
        try:
            candles = self.client.get_candles(asset, timeframe, count)
            return candles
        except Exception as e:
            logger.error(f"Error al obtener velas: {str(e)}")
            return []
    
    async def buy_option(self, asset: str, amount: float, direction: str, expiration: int) -> Dict:
        """Comprar una opción"""
        if not self.check_connection():
            return {"success": False, "message": "No conectado"}
            
        try:
            if direction not in ["call", "put"]:
                return {"success": False, "message": "Dirección inválida, debe ser 'call' o 'put'"}
                
            # Verificar si el activo está abierto
            if not self.client.check_asset_open(asset):
                return {"success": False, "message": f"El activo {asset} está cerrado"}
                
            # Ejecutar la operación
            status, order_id = self.client.buy(amount, asset, direction, expiration)
            
            if status:
                logger.info(f"Orden ejecutada: {asset} {direction} ${amount} exp:{expiration}s")
                return {
                    "success": True,
                    "order_id": order_id,
                    "asset": asset,
                    "direction": direction,
                    "amount": amount,
                    "expiration": expiration
                }
            else:
                logger.error(f"Error al ejecutar orden: {order_id}")
                return {"success": False, "message": f"Error al ejecutar orden: {order_id}"}
        except Exception as e:
            logger.error(f"Excepción al comprar opción: {str(e)}")
            return {"success": False, "message": str(e)}
    
    async def check_order_result(self, order_id: str) -> Dict:
        """Verificar resultado de una orden"""
        if not self.check_connection():
            return {"success": False, "message": "No conectado"}
            
        try:
            # Esperar a que la orden se complete
            while True:
                result = self.client.check_win_v3(order_id)
                if result[0]:
                    break
                time.sleep(1)
                
            win_amount = result[1]
            
            if win_amount > 0:
                return {
                    "success": True,
                    "result": "win",
                    "profit": win_amount,
                    "order_id": order_id
                }
            elif win_amount == 0:
                return {
                    "success": True,
                    "result": "tie",
                    "profit": 0,
                    "order_id": order_id
                }
            else:
                return {
                    "success": True,
                    "result": "loss",
                    "profit": win_amount,
                    "order_id": order_id
                }
        except Exception as e:
            logger.error(f"Error al verificar resultado de orden: {str(e)}")
            return {"success": False, "message": str(e)}
    
    async def disconnect(self) -> bool:
        """Desconectar de IQ Option"""
        if self.client:
            try:
                self.client.disconnect()
                self.connected = False
                self.email = None
                return True
            except Exception as e:
                logger.error(f"Error al desconectar: {str(e)}")
                return False
        return True

# Instancia global del cliente
iq_client = IQOptionClient()