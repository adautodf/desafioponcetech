from fastapi.testclient import TestClient
from app.main import app
from app.db.session import SessionLocal, engine
from app.db.base import Base

Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_criar_tarefa():
    response = client.post(
        "/api/v1/tarefas/",
        json={"titulo": "Teste", "descricao": "Descrição do teste", "data_vencimento": "2024-12-31", "horario_vencimento": "12:00:00", "status": "Pendente"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["titulo"] == "Teste"
    assert data["descricao"] == "Descrição do teste"
    assert data["data_vencimento"] == "2024-12-31"
    assert data["horario_vencimento"] == "12:00:00"
    assert data["status"] == "Pendente"

def test_ler_tarefas():
    response = client.get("/api/v1/tarefas/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_editar_tarefa():
    response = client.post(
        "/api/v1/tarefas/",
        json={"titulo": "Teste", "descricao": "Descrição do teste", "data_vencimento": "2024-12-31", "horario_vencimento": "12:00:00", "status": "Pendente"},
    )
    tarefa_id = response.json()["id"]

    response = client.put(
        f"/api/v1/tarefas/{tarefa_id}",
        json={"titulo": "Teste Editado", "descricao": "Descrição editada", "data_vencimento": "2024-12-31", "horario_vencimento": "13:00:00", "status": "Concluída"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["titulo"] == "Teste Editado"
    assert data["descricao"] == "Descrição editada"
    assert data["horario_vencimento"] == "13:00:00"
    assert data["status"] == "Concluída"

def test_remover_tarefa():
    response = client.post(
        "/api/v1/tarefas/",
        json={"titulo": "Teste", "descricao": "Descrição do teste", "data_vencimento": "2024-12-31", "horario_vencimento": "12:00:00", "status": "Pendente"},
    )
    tarefa_id = response.json()["id"]

    response = client.delete(f"/api/v1/tarefas/{tarefa_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["detail"] == "Tarefa removida com sucesso"
