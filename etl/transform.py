import json
from etl.extract import extract_data

def transform_data():
    data = extract_data(limit=100)

    transformed = []
    for row in data:
        fecha_raw = row.get("fecha_de_ultima_actualizaci", "")
        fecha_final = None
        if fecha_raw and "T" in fecha_raw:
            fecha_final = fecha_raw.split("T")[0]

        transformed.append({
            "id": int(row.get("id", 0)),
            "categoria": row.get("categor_a", "").strip(),
            "entidad": row.get("nombre_entidades_responsables", "").strip(),
            "conjunto_datos": row.get("conjunto_de_datos", "").strip(),
            "descripcion": row.get("descripci_n", "").strip(),
            "sistema": row.get("sistema_de_informaci_n", "").strip(),
            "publicado": row.get("publicado", "").strip(),
            "dato_abierto": row.get("dato_abierto", "").strip(),
            "enlace": row.get("enlace_portal_de_datos", "").strip(),
            "fecha_actualizacion": fecha_final  # Aquí puede ser None
        })

    print(f"Datos transformados correctamente. Total registros: {len(transformed)}")
    print("Primer registro transformado:")
    print(json.dumps(transformed[0], indent=4, ensure_ascii=False))
    return transformed

if __name__ == "__main__":
    transform_data()
