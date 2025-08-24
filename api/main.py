from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import router

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Prueba Técnica",
    description="API para consumir datos de beneficiarios",
    version="1.0.0"
)

# Configuración CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],     
)

app.include_router(router)
