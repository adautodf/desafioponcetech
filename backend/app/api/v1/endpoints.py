from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.crud.tarefa import criar_tarefa, ler_tarefas, editar_tarefa, remover_tarefa
from app.schemas.tarefa import TarefaBase, TarefaModel
from app.db.session import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tarefas/", response_model=TarefaModel)
async def criar_tarefa_endpoint(tarefa: TarefaBase, db: Session = Depends(get_db)):
    return criar_tarefa(db, tarefa)

@router.get("/tarefas/", response_model=List[TarefaModel])
async def ler_tarefas_endpoint(db: Session = Depends(get_db)):
    return ler_tarefas(db)

@router.put("/tarefas/{tarefa_id}", response_model=TarefaModel)
async def editar_tarefa_endpoint(tarefa_id: int, tarefa: TarefaBase, db: Session = Depends(get_db)):
    db_tarefa = editar_tarefa(db, tarefa_id, tarefa)
    if not db_tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return db_tarefa

@router.delete("/tarefas/{tarefa_id}")
async def remover_tarefa_endpoint(tarefa_id: int, db: Session = Depends(get_db)):
    db_tarefa = remover_tarefa(db, tarefa_id)
    if not db_tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return {"detail": "Tarefa removida com sucesso"}
