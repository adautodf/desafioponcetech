from sqlalchemy.orm import Session
from app.models.tarefa import Tarefa
from app.schemas.tarefa import TarefaBase

def criar_tarefa(db: Session, tarefa: TarefaBase):
    db_tarefa = Tarefa(**tarefa.model_dump())
    db.add(db_tarefa)
    db.commit()
    db.refresh(db_tarefa)
    return db_tarefa

def ler_tarefas(db: Session):
    return db.query(Tarefa).all()

def editar_tarefa(db: Session, tarefa_id: int, tarefa: TarefaBase):
    db_tarefa = db.query(Tarefa).filter(Tarefa.id == tarefa_id).first()
    if db_tarefa:
        db_tarefa.titulo = tarefa.titulo
        db_tarefa.descricao = tarefa.descricao
        db_tarefa.data_vencimento = tarefa.data_vencimento
        db_tarefa.horario_vencimento = tarefa.horario_vencimento
        db_tarefa.status = tarefa.status
        db.commit()
        db.refresh(db_tarefa)
    return db_tarefa

def remover_tarefa(db: Session, tarefa_id: int):
    db_tarefa = db.query(Tarefa).filter(Tarefa.id == tarefa_id).first()
    if db_tarefa:
        db.delete(db_tarefa)
        db.commit()
    return db_tarefa
