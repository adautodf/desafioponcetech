from pydantic import BaseModel

class TarefaBase(BaseModel):
    titulo: str
    descricao: str
    data_vencimento: str
    horario_vencimento: str
    status: str

class TarefaModel(TarefaBase):
    id: int

    class ConfigDict:
        from_attributes = True
