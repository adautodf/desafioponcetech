from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Tarefa(Base):
    __tablename__ = 'tarefas'

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    descricao = Column(String)
    data_vencimento = Column(String)
    horario_vencimento = Column(String)
    status = Column(String)
