from .database import engine, Base
from .models import Beneficiario

print("Creando tablas...")
Base.metadata.create_all(bind=engine)
print("Tablas creadas correctamente.")
