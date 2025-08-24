from pydantic import BaseModel
from datetime import date
from typing import Optional

class BeneficiarioBase(BaseModel):
    id: int
    categoria: Optional[str] = None
    entidad: Optional[str] = None
    conjunto_datos: Optional[str] = None
    descripcion: Optional[str] = None
    sistema: Optional[str] = None
    publicado: Optional[str] = None
    dato_abierto: Optional[str] = None
    enlace: Optional[str] = None
    fecha_actualizacion: Optional[date] = None

    model_config = {
        "from_attributes": True, 
    }