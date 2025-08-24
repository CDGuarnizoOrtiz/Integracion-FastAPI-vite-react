import requests
import json

URL = "https://www.datos.gov.co/resource/v8aw-jabd.json"

def extract_data(limit=20):
    params = {"$limit": limit}
    try:
        response = requests.get(URL, params=params)
        response.raise_for_status()
        data = response.json()

        if not data:
            print("No se recibieron datos de la API.")
            return []

        print(" Datos extraídos correctamente.")
        print(" Primer registro:")
        print(json.dumps(data[0], indent=4, ensure_ascii=False))
        print(" Campos disponibles:", list(data[0].keys()))
        return data

    except requests.exceptions.RequestException as e:
        print(f" Error al conectar con la API: {e}")
        return []

if __name__ == "__main__":
    extract_data()
