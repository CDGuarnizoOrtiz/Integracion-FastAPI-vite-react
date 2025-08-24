from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Beneficiario
from .transform import transform_data

def load_data():
    data = transform_data()
    db: Session = SessionLocal()

    try:
        for row in data:
            existe = db.query(Beneficiario).filter_by(id=row["id"]).first()
            if not existe:
                beneficiario = Beneficiario(**row)
                db.add(beneficiario)
        db.commit()
        print(f"{len(data)} registros cargados correctamente en la base de datos.")
    except Exception as e:
        db.rollback()
        print(f" Error al cargar datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    load_data()
