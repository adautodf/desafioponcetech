"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  DatePicker,
  TimeInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import api from "../api";
import { DateValue, TimeValue } from "@react-types/datepicker";
import { SyntheticEvent } from "react";
import { I18nProvider } from "@react-aria/i18n";
import * as Toast from "@radix-ui/react-toast";

interface FormData {
  titulo: string;
  descricao: string;
  data_vencimento: string;
  horario_vencimento: string;
  status: string;
}

export default function CriarTarefa() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    descricao: "",
    data_vencimento: "",
    horario_vencimento: "",
    status: "Pendente",
  });

  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const statusOptions = [
    { label: "Pendente", value: "Pendente" },
    { label: "Em Progresso", value: "Em Progresso" },
    { label: "Concluída", value: "Concluída" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: value,
    }));
  };

  const handleDateChange = (value: DateValue) => {
    const formattedDate = value.toString();
    setFormData((prevFormData) => ({
      ...prevFormData,
      data_vencimento: formattedDate,
    }));
  };

  const handleTimeChange = (value: TimeValue) => {
    const formattedTime = value.toString();
    setFormData((prevFormData) => ({
      ...prevFormData,
      horario_vencimento: formattedTime,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.titulo ||
      !formData.data_vencimento ||
      !formData.horario_vencimento ||
      !formData.status
    ) {
      setToastMessage("Por favor, preencha todos os campos obrigatórios.");
      setOpenToast(true);
      return;
    }

    try {
      await api.post("/api/v1/tarefas/", formData);
      setFormData({
        titulo: "",
        descricao: "",
        data_vencimento: "",
        horario_vencimento: "",
        status: "Pendente",
      });
      setToastMessage("Tarefa criada com sucesso!");
      onClose();
    } catch (error) {
      setToastMessage("Erro ao criar a tarefa.");
    } finally {
      setOpenToast(true);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          isIconOnly
          color="primary"
          onClick={onOpen}
          className="capitalize w-12 h-12 flex items-center justify-center rounded-full hover:bg-#8080FF"
        >
          <Plus />
        </Button>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Criar Tarefa</ModalHeader>
          <ModalBody>
            <form onSubmit={handleFormSubmit}>
              <Input
                isRequired
                name="titulo"
                label="Título da Tarefa"
                onChange={handleInputChange}
              />
              <Input
                className="mt-2"
                name="descricao"
                label="Descrição"
                onChange={handleInputChange}
              />
              <I18nProvider locale="pt-br">
                <DatePicker
                  className="mt-2"
                  isRequired
                  name="data_vencimento"
                  label="Data Limite"
                  granularity="day"
                  onChange={handleDateChange}
                />
              </I18nProvider>
              <TimeInput
                className="mt-2"
                isRequired
                name="horario_vencimento"
                label="Horário Limite"
                onChange={handleTimeChange}
                hourCycle={24}
              />
              <Select
                className="mt-2"
                name="status"
                label="Selecione o Status"
                isRequired
                onChange={(e: SyntheticEvent) => handleStatusChange((e.target as HTMLInputElement).value)}
              >
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.value}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex flex-col-reverse sm:flex-row mt-4 sm:space-x-2 mb-4">
                <Button color="danger" variant="flat" onPress={onClose} className="w-full mt-2 sm:mt-0">
                  Cancelar
                </Button>
                <Button color="primary" type="submit" className="w-full sm:mt-0">
                  Criar Tarefa
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Toast Component */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          open={openToast}
          onOpenChange={setOpenToast}
          className="bg-white border border-gray-300 shadow-lg rounded-md p-4"
        >
          <Toast.Title >{toastMessage}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 p-6 flex flex-col gap-2 w-[360px] max-w-full m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </>
  );
}
