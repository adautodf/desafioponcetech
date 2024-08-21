"use client"

import React, { useState, useEffect } from "react";
import { Button, Input, useDisclosure, Tabs, Tab, Card, Badge, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Edit, Trash, RefreshCw, CheckCircle2, CircleDotDashed, Cog } from "lucide-react";
import api from "./api";
import CriarTarefa from "./_components/criar-tarefa";
import EditarTarefa from "./_components/editar-tarefa";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTarefa, setSelectedTarefa] = useState(null);

  const fetchTarefas = async () => {
    const response = await api.get("/api/v1/tarefas/");
    const sortedTarefas = response.data.sort((a: any, b: any) => {
      const dateA = new Date(a.data_vencimento);
      const dateB = new Date(b.data_vencimento);
      return dateA.getTime() - dateB.getTime();
    });
    setTarefas(sortedTarefas);
  }

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handleEditClick = (tarefa: any) => {
    setSelectedTarefa(tarefa);
    onOpen();
  };

  const handleDeleteClick = async (id: number) => {
    await api.delete(`/api/v1/tarefas/${id}`);
    fetchTarefas();
  };

  const handleRefreshClick = () => {
    fetchTarefas();
  };

  function obterSaudacao(): string {
    const horas = new Date().getHours();

    if (horas >= 5 && horas < 12) {
      return "Bom dia";
    } else if (horas >= 12 && horas < 18) {
      return "Boa tarde";
    } else if (horas >= 18 && horas < 22) {
      return "Boa noite";
    } else {
      return "Boa madrugada";
    }
  }

  const totalTarefas = tarefas.length;
  const concluidas = tarefas.filter((tarefa: any) => tarefa.status === "Concluída").length;
  const emProgresso = tarefas.filter((tarefa: any) => tarefa.status === "Em Progresso").length;
  const pendentes = tarefas.filter((tarefa: any) => tarefa.status === "Pendente").length;

  return (
    <div className="space-y-4 mt-4 p-12">
      <div className="absolute top-17 right-16">
        <CriarTarefa />
      </div>

      <h1> {obterSaudacao()}! 👋</h1>

      <div className="flex flex-row">
        <h1 className="text-2xl font-bold">Visão Geral de Todas as Tarefas</h1>
        <Button isIconOnly color="primary" className="ml-2 mt-[-3px]" variant="light" onClick={handleRefreshClick}>
          <RefreshCw size={18} />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-lg flex flex-col items-center justify-center p-4">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8080FF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-6 w-6 text-primary"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="8" y1="7" x2="16" y2="7" />
              <line x1="8" y1="11" x2="16" y2="11" />
              <line x1="8" y1="15" x2="16" y2="15" />
              <polyline points="4 7 5 8 7 5" />
              <polyline points="4 11 5 12 7 9" />
              <polyline points="4 15 5 16 7 13" />
            </svg>
            <h2 className="text-sm font-medium text-center">Total de Tarefas</h2>
          </CardHeader>
          <div className="text-2xl font-bold text-primary mt-[-5px]">{totalTarefas}</div>
        </Card>


        <Card className="rounded-lg flex flex-col items-center justify-center p-4">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <CheckCircle2 color="#8080FF" />
            <h2 className="text-sm font-medium text-center">Tarefas Concluídas</h2>
          </CardHeader>
          <div className="text-2xl font-bold text-primary mt-[-5px]">{concluidas}</div>
        </Card>

        <Card className="rounded-lg flex flex-col items-center justify-center p-4">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <Cog color="#8080FF" />
            <h2 className="text-sm font-medium text-center">Tarefas Em Progresso</h2>
          </CardHeader>
          <div className="text-2xl font-bold text-primary mt-[-5px]">{emProgresso}</div>
        </Card>

        <Card className="rounded-lg flex flex-col items-center justify-center p-4">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <CircleDotDashed color="#8080FF" />
            <h2 className="text-sm font-medium text-center">Tarefas Pendentes</h2>
          </CardHeader>
          <div className="text-2xl font-bold text-primary mt-[-5px]">{pendentes}</div>
        </Card>
      </div>

      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tarefas.map((tarefa: any) => (
          <Card key={tarefa.id} className="p-2 h-full overflow-y-auto">
            <CardHeader>
              <h3 className="text-lg font-bold">{tarefa.titulo}</h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm">{tarefa.descricao}</p>
              <p className="text-sm">
                Data Vencimento: {tarefa.data_vencimento.split('-').reverse().join('/')}
              </p>
              <p className="text-sm">
                Horário: {tarefa.horario_vencimento.substring(0, 5)}
              </p>
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <Card
                className={`${tarefa.status === "Concluída"
                  ? "bg-green-500"
                  : tarefa.status === "Pendente"
                    ? "bg-yellow-500"
                    : tarefa.status === "Em Progresso"
                      ? "bg-blue-500"
                      : "bg-zinc-500"
                  } w-auto`}
              >
                <CardBody>
                  <p className="text-sm font-bold">{tarefa.status}</p>
                </CardBody>
              </Card>

              <div className="flex space-x-2">
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onClick={() => handleEditClick(tarefa)}
                >
                  <Edit color="#8080FF" size={17} />
                </Button>
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onClick={() => handleDeleteClick(tarefa.id)}
                >
                  <Trash color="#8080FF" size={17} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedTarefa && (
        <EditarTarefa
          tarefa={selectedTarefa}
          isOpen={isOpen}
          onClose={() => {
            setSelectedTarefa(null);
            onClose();
            fetchTarefas();
          }}
        />
      )}

    </div>
  );
}