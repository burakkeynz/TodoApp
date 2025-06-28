from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from typing import Annotated, List
from backend.models import Todos
from starlette import status
from pydantic import BaseModel, Field
from backend.routers.auth import get_current_user



router = APIRouter(
    prefix='/admin',
    tags=['admin']
) #Uygulamayı başlatıyoruz

#DB bağlantısı sağlama, her API isteği geldiğinde yeni Session açılır işlem bitince kapanır
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency =  Annotated[Session, Depends(get_db)] #python 3.9+ dependency injection daha iyi hali
#Annotated, bir tip üzerine ek açıklama (annotation) eklemeni sağlar.
#Annotated[GerçekTip, Ekstrabilgi] --> db_dependency Session type, Depends/get_db) üzerinden sğalanıyor
user_dependency=Annotated[dict, Depends(get_current_user)]

@router.get('/todos',status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db:db_dependency):
    if user is None or user.get('role') != 'admin':
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Todos).all()

@router.delete('/todo/{todo_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(user: user_dependency, db: db_dependency, todo_id: int):
    if user is None or user.get('role') != 'admin':
        raise HTTPException(status_code=401, detail='Authentication Failed')
    todo_model = db.query(Todos).filter(Todos.id == todo_id).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found')
    db.delete(todo_model)
    db.commit()

