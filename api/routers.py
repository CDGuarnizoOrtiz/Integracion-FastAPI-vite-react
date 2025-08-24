from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import Optional, List
from . import models, schemas
from .database import get_db

router = APIRouter(prefix="/registros", tags=["Registros"])

# Obtener todos los registros
@router.get("/", response_model=List[schemas.BeneficiarioBase])
def obtener_registros(db: Session = Depends(get_db)):
    return db.query(models.Beneficiario) \
             .order_by(models.Beneficiario.id.asc()) \
             .limit(20) \
             .all()


# Filtrar por id, fecha y/o categoría
@router.get("/filtrar", response_model=List[schemas.BeneficiarioBase])
def filtrar_registros(
    id: Optional[int] = Query(None, description="Filtrar por ID"),
    fecha: Optional[str] = Query(None, description="Filtrar por año o fecha parcial"),
    categoria: Optional[str] = Query(None, description="Filtrar por categoría"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Beneficiario)

    
    if id is not None:
        query = query.filter(models.Beneficiario.id == id)

    
    if fecha:
        query = query.filter(
            cast(models.Beneficiario.fecha_actualizacion, String).like(f"%{fecha}%")
        )
    if categoria:
        query = query.filter(models.Beneficiario.categoria.ilike(f"%{categoria}%"))

    resultados = query.order_by(models.Beneficiario.id.asc()).limit(20).all()

    if not resultados:
        raise HTTPException(status_code=404, detail="No se encontraron registros con esos filtros")

    return resultados


@router.get("/{id}", response_model=schemas.BeneficiarioBase)
def obtener_registro(id: int, db: Session = Depends(get_db)):
    registro = db.query(models.Beneficiario).filter(models.Beneficiario.id == id).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    return registro
