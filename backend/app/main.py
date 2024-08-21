from fastapi import FastAPI
from app.api.v1 import endpoints as tarefa_endpoints
from app.db.base import Base
from app.db.session import engine
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tarefa_endpoints.router, prefix="/api/v1")
