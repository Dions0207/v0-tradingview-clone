from pydantic import BaseModel
from typing import List, Dict, Optional, Union
from datetime import datetime

class User(BaseModel):
    email: str
    is_connected: bool
    balance: float
    balance_type: str

class Candle(BaseModel):
    from_time: int
    to_time: int
    open: float
    close: float
    high: float
    low: float
    volume: int

class Order(BaseModel):
    id: str
    asset: str
    direction: str
    amount: float
    open_time: int
    close_time: Optional[int] = None
    result: Optional[str] = None
    profit: Optional[float] = None