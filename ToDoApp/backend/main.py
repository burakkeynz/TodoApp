from fastapi import FastAPI
from backend.models import Base
from backend.database import engine
from backend.routers import auth, todos, admin, users
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

load_dotenv()

origins = os.getenv("CORS_ORIGINS", "").split(",")

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/media", StaticFiles(directory="media"), name="media")

@app.get('/healthy')
def health_check():
    return {'status':'Healthy'}

Base.metadata.create_all(bind=engine) #Base’ten türeyen tüm modellerin tablolarını veritabanına fiziksel olarak oluşturur.
app.include_router(auth.router)
app.include_router(todos.router)
app.include_router(admin.router)
app.include_router(users.router)
