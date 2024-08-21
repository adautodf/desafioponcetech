# Desafio: Sistema de Gerenciamento de Tarefas


## Como Usar

#### Backend
#### Antes de tudo, você precisa instalar as dependências necessárias, com os comandos a partir da pasta raiz:

```
python -m venv env (cria a pasta env)
```


```
env\Scripts\Activate (Ativa seu console na ENV)
```

```
cd .\backend\ (se direcionando para pasta backend)
```

```
pip install -r requirements.txt (instalando todas dependencias)
```

```
uvicorn app.main:app --reload (iniciando uvicorn)
```


#### Frontend (Você deve começar pela pasta raiz do projeto)

```
cd .\frontend\ (se direcionando para a pasta frontend)
```

```
npm install (instalando todas dependencias necessárias)
```

```
npm run dev (iniciando localhost:3000)
```


## Column Tarefa

![App Screenshot](https://utfs.io/f/202c6808-b703-45cc-8de1-bb66829a473c-euykl.png)

Para entender a estrutura do Projeto, é necessário entender como funciona a tabela Tarefa. Esta imagem foi o primeiro "diagrama" realizado, mas com a necessidade do projeto mudou um pouco.

Database:
| Variável               | Tipo                                                |
| ----------------- | ---------------------------------------------------------------- |
| Título *    | String |
| Descrição   | String |
| Data de Vencimento * | String |
| Horário de Vencimento * | String |
| Status *    | String |

Foi preferido utilizar todas variáveis no tipo String afim de facilitar manipulação do dado no Front-End.


## Estrutura

O projeto conta com 3 pastas.
- **Backend** (contendo toda estrutura do python com FastAPI)
- **env** (contendo toda estrutura para acesso a env e etc)
- **Frontend** (contendo toda estrutura do frontend e conexão na api do FastAPI)

## Estrutura backend

Seguindo os princípios da Clean Architecture, que facilita a manutenção e escalabilidade do código ao separar claramente as responsabilidades dentro da aplicação, a estrutura se encontra assim:

- App (Diretório Principal onde todo o código relacionado à lógica está localizado);
- api (Endpoints);
- core (Config principal que define var de ambiente e etc...);
- crud (operações Create, Read, Update e Delete);
- db (config do banco de dados);
- models (modelos do SQLAlchemy);
- schemas (esquemas do Pydantic);
- main.py (onde o FastAPI é configurado, conectando o middleware e rotas);
- tests (testes automatizados testando a criação, edição e remoção de tarefas);
- poncetech.db (banco de dados SQLite);
- requirements.txt (dependências do projeto);

## Estrutura frontend

- public (pasta com arquivos publicos);
- src:
  - app (onde se encontra o conteúdo da aplicação frontend, com rotas e etc);
  - providers (provider do nextUI);
- next.config (config do nextJS);
- tailwind.config.ts (config do tailwind, onde fica normalmente as pré seleções de temas e etc);
- tsconfig.json (config do typescript);


Desafio:

"Você foi contratado para criar um pequeno sistema de gerenciamento de tarefas que permita
a criação, edição, exclusão e listagem de tarefas. As tarefas podem ter um título, uma
descrição, uma data de vencimento e um status (pendente, em progresso, concluída)."

Requisitos:
- Criação de Tarefas: O usuário deve ser capaz de criar uma nova tarefa com um título,
descrição, data de vencimento e status inicial.
- Edição de Tarefas: O usuário pode atualizar qualquer informação de uma tarefa existente.
- Exclusão de Tarefas: O usuário pode excluir uma tarefa existente.
- Listagem de Tarefas: O sistema deve permitir a listagem de todas as tarefas, filtradas por
status e/ou ordenadas por data de vencimento.
- Armazenamento: As tarefas devem ser armazenadas de maneira persistente (pode ser um
arquivo local como JSON, ou banco de dados simples como SQLite)

Instruções:
- Crie uma solução que organize o código de forma modular.
- Utilize boas práticas de programação, como encapsulamento, uso de classes e métodos.
- Explique brevemente a arquitetura que escolheu e as decisões de design que tomou ao
criar o sistema.
- Se desejar, pode adicionar funcionalidades extras, como a possibilidade de marcar tarefas
como "urgentes" ou enviar lembretes para tarefas com vencimento próximo

Entrefa:
- Enviar o código fonte do projeto;
- Anexar um README.md explicando a solução, como executar o código e os testes;
- Prazo para entrega: Até 2 dias após o recebimento;
- Após a entrega, será agendado um momento para explicação do código e
processo criativo

Critérios de avaliação:
- Compreensão do problema;
- Arquitetura;
- Qualidade do código;
- Criatividade;
- Documentação