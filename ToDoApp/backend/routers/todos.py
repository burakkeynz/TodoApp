from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from typing import Annotated, List
from backend.models import Todos
from starlette import status
from pydantic import BaseModel, Field
from backend.routers.auth import get_current_user



router = APIRouter(
    prefix='/todos',
    tags=['todos']
) #Uygulamayı başlatıyoruz



#DB bağlantısı sağlanla, her API isteği geldiğinde yeni Session açılır işlem bitince kapanır
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


class TodoRequest(BaseModel):
    title:str = Field(min_length=3)
    description:str = Field(min_length=3, max_length=100)
    priority:int =Field(gt=0, lt=6)
    complete:bool

class TodoResponse(BaseModel):
    title: str
    description: str
    priority: int
    complete: bool
    id: int

    class Config:
        orm_mode = True
@router.get('/',response_model=List[TodoResponse], status_code=status.HTTP_200_OK)
async def read_all(user:user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Todos).filter(Todos.owner_id == user.get('id')).all()


@router.get('/todo/{todo_id}',response_model=TodoResponse, status_code=status.HTTP_200_OK)
async def read_todo(user:user_dependency, db: db_dependency,todo_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    todo_model = db.query(Todos).filter(Todos.id == todo_id).filter(Todos.owner_id == user.get('id')).first()
    if todo_model is not None:
        return todo_model
    else:
        raise HTTPException(status_code=404, detail='Todo not found')

@router.post('/todo', status_code= status.HTTP_201_CREATED)
async def create_todo(user: user_dependency, db: db_dependency, todo_request: TodoRequest):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    todo_model = Todos(**todo_request.model_dump(), owner_id = user.get('id'))
    db.add(todo_model)
    db.commit()

@router.put('/todo/{todo_id}', status_code=status.HTTP_204_NO_CONTENT)
async def update_todo(user:user_dependency,
                      db: db_dependency,
                      todo_request: TodoRequest,
                      todo_id: int = Path(gt=0),
                     ):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication failed')
    todo_model = db.query(Todos).filter(Todos.owner_id == user.get('id')).filter(Todos.id == todo_id).first()
    #Guard Clause
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found')
    todo_model.title = todo_request.title
    todo_model.description = todo_request.description
    todo_model.priority = todo_request.priority
    todo_model.complete = todo_request.complete

    db.add(todo_model)
    db.commit()

@router.delete('/todo/{todo_id}' ,status_code = status.HTTP_204_NO_CONTENT)
async def delete_todo (user:user_dependency, db: db_dependency, todo_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication failed')
    todo_model = db.query(Todos).filter(Todos.id == todo_id).filter(Todos.owner_id == user.get('id')).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found')

    db.delete(todo_model)
    db.commit()
