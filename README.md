# Proyecto ETL + API + Frontend

## Este proyecto implementa un **pipeline ETL** para extracción, transformación y carga de datos, acompañado de una **API REST** desarrollada en **FastAPI** y un **frontend** en **Vite-React**.  
Todo el entorno está **dockerizado** para simplificar la ejecución.

# Tecnologías Usadas

- **Python**
- **FastAPI** (backend / API REST)
- **React + Vite** (frontend)
- **PostgreSQL** (base de datos)
- **Docker & Docker Compose**

# Diseño del proyecto

El proyecto sigue una arquitectura modular con tres capas principales:

 -ETL: Se encarga de obtener, transformar y cargar datos en la base de datos PostgreSQL.

 -API: Implementada en FastAPI, expone endpoints para consumir los datos y realizar operaciones CRUD.

 -Frontend: Desarrollado en React, consume la API y presenta los datos de forma interactiva y amigable.

 -La dockerización permite levantar todos los servicios de forma automática, sin necesidad de configuraciones manuales.

## Uso de IA
En este proyecto use la IA de forma responsable ,usandola en varias etapas como por ejemeplo la de ETL, para detectar inconsistencias y solucionar errores de manera rapida y precisa. 

Donde mas utilice la IA fue para desarrollar la tabla creada en el frontend ya que se pedia algo sencillo simplemente para mostrar los datos servidos.



## Pasos para la ejecución correcta del proyecto

 1️. Clonar el repositorio
```bash
git clone https://github.com/CDGuarnizoOrtiz/Integracion-FastAPI-vite-react.git
cd prueba_tecnica

##CREAMOS E INICIAMOS LOS CONTENEDDORES##

docker-compose up 

##Accedemos a los servicios##

 -Frontend: http://localhost:5173

 -API FastAPI: http://localhost:8000

 -Documentación interactiva de la API: http://localhost:8000/docs

 -Base de datos PostgreSQL: puerto 5432

##Detenemos los contenedores##
 crtl + c
 docker-compose down
