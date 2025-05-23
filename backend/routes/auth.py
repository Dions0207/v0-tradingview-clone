from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from utils.iq_option_client import iq_client

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    balance: float = 0.0
    balance_type: str = "PRACTICE"

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """Iniciar sesión en IQ Option"""
    success = await iq_client.connect(request.email, request.password)
    
    if success:
        balance = await iq_client.get_balance()
        return {
            "success": True,
            "message": "Conectado exitosamente",
            "balance": balance,
            "balance_type": iq_client.balance_type
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/logout")
async def logout():
    """Cerrar sesión en IQ Option"""
    success = await iq_client.disconnect()
    return {"success": success, "message": "Desconectado exitosamente" if success else "Error al desconectar"}

@router.get("/status")
async def status():
    """Verificar estado de conexión"""
    connected = iq_client.check_connection()
    
    if connected:
        balance = await iq_client.get_balance()
        return {
            "connected": True,
            "email": iq_client.email,
            "balance": balance,
            "balance_type": iq_client.balance_type
        }
    else:
        return {"connected": False}

@router.post("/change-balance")
async def change_balance(balance_type: str):
    """Cambiar tipo de balance (PRACTICE/REAL)"""
    if not iq_client.check_connection():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No conectado a IQ Option",
        )
        
    success = iq_client.set_balance_type(balance_type)
    
    if success:
        balance = await iq_client.get_balance()
        return {
            "success": True,
            "balance_type": balance_type,
            "balance": balance
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Tipo de balance inválido: {balance_type}. Debe ser 'PRACTICE' o 'REAL'",
        )
