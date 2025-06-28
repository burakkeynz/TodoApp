from backend.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey


class Users(Base):
    __tablename__='users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(length=255), unique=True)
    username = Column(String(length=150), unique=True)
    first_name = Column(String(length=100))
    last_name = Column(String(length=100))
    hashed_password = Column(String(length=255))
    is_active = Column(Boolean, default=True)
    role = Column(String(length=50))
    phone_number = Column(String(length=20))
    photo_url = Column(String(length=255),nullable=True)
    #bunu önceden yazarsak users-phone_number does not exist hatası verir
    #önce alembic ile column olsuturmalıyız

#DB'deki satırların Python karşılığı olan Todos class'ı, attributeler vs var
class Todos(Base):
    __tablename__ = 'todos'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(length=255))
    description = Column(String(length=500))
    priority = Column(Integer)
    complete = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey('users.id'))