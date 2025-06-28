from fastapi import APIRouter, Depends, HTTPException, Path, UploadFile, File
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from typing import Annotated, List
from backend.models import Todos, Users
from starlette import status
from pydantic import BaseModel, Field
from backend.routers.auth import get_current_user
from passlib.context import CryptContext
import os
import shutil
from uuid import uuid4
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix='/users',
    tags=['users']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

class UserVerification(BaseModel):
    password: str
    new_password: str = Field(min_length=6)

@router.get('/get_user', status_code=status.HTTP_200_OK)
async def get_user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Users).filter(Users.id == user.get('id')).first()

@router.put('/change_password', status_code=status.HTTP_204_NO_CONTENT)
async def change_password(user: user_dependency, db: db_dependency, user_verification: UserVerification):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    user_model = db.query(Users).filter(Users.id == user.get('id')).first()

    if not bcrypt_context.verify(user_verification.password, user_model.hashed_password):
        raise HTTPException(status_code=401, detail='Error on password change')
    user_model.hashed_password = bcrypt_context.hash(user_verification.new_password)
    db.add(user_model)
    db.commit()

@router.put('/phone_number/{phone_number}', status_code=status.HTTP_204_NO_CONTENT)
async def change_phone_number(user: user_dependency, db: db_dependency, phone_number: str):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    user_model = db.query(Users).filter(Users.id == user.get('id')).first()
    user_model.phone_number = phone_number
    db.add(user_model)
    db.commit()

@router.post('/upload_profile_photo', status_code=status.HTTP_201_CREATED)
async def upload_profile_photo(
    user: user_dependency,
    db: db_dependency,
    file: UploadFile = File(...)
):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    file_ext = file.filename.split('.')[-1]
    filename = f"{uuid4()}.{file_ext}"
    folder_path = os.getenv("MEDIA_ROOT", "media/profile_pics")
    os.makedirs(folder_path, exist_ok=True)

    save_path = os.path.join(folder_path, filename)
    
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    user_model = db.query(Users).filter(Users.id == user.get("id")).first()
    user_model.photo_url = f"/{folder_path}/{filename}"

    db.add(user_model)
    db.commit()

    return {"message": "Fotoğraf başarıyla yüklendi", "photo_url": user_model.photo_url}
