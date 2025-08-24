from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Beneficiario(Base):
    __tablename__ = "beneficiarios"

    id = Column(Integer, primary_key=True, index=True)
    categoria = Column(String)
    entidad = Column(String)
    conjunto_datos = Column(String)
    descripcion = Column(String)
    sistema = Column(String)
    publicado = Column(String)
    dato_abierto = Column(String)
    enlace = Column(String)
    fecha_actualizacion = Column(Date)
