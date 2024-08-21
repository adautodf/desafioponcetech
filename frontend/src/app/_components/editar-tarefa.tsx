import React, { SyntheticEvent, useEffect, useState } from "react";
import {
    Button,
    Input,
    DatePicker,
    TimeInput,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
    ModalContent,
    useDisclosure
} from "@nextui-org/react";
import api from "../api";
import { DateValue, TimeValue } from "@react-types/datepicker";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate, parseTime } from "@internationalized/date";

interface FormData {
    id?: number;
    titulo: string;
    descricao: string;
    data_vencimento: string; // Formato "YYYY-MM-DD"
    horario_vencimento: string; // Formato "HH:MM:SS"
    status: string;
}

interface EditarTarefaProps {
    tarefa: FormData;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditarTarefa({ tarefa, isOpen, onClose }: EditarTarefaProps) {
    const [formData, setFormData] = useState<FormData>({
        id: tarefa.id,
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        data_vencimento: tarefa.data_vencimento,
        horario_vencimento: tarefa.horario_vencimento,
        status: tarefa.status || "Pendente",
    });

    const statusOptions = [
        { label: "Pendente", value: "Pendente" },
        { label: "Em Progresso", value: "Em Progresso" },
        { label: "Concluída", value: "Concluída" },
    ];

    useEffect(() => {
        if (tarefa) {
            setFormData({
                id: tarefa.id,
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                data_vencimento: tarefa.data_vencimento,
                horario_vencimento: tarefa.horario_vencimento,
                status: tarefa.status || "Pendente",
            });
        }
    }, [tarefa]);

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
        const formattedTime = value.toString(); // Converte o objeto TimeValue para string
        setFormData((prevFormData) => ({
            ...prevFormData,
            horario_vencimento: formattedTime,
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (formData.id) {
                // Se formData.id existir, então estamos editando uma tarefa existente
                await api.put(`/api/v1/tarefas/${formData.id}/`, formData);
            } else {
                // Se formData.id não existir, estamos criando uma nova tarefa
                await api.post("/api/v1/tarefas/", formData);
            }

            onClose(); // Fecha o modal após a operação bem-sucedida
        } catch (error) {
            console.error("Erro ao salvar a tarefa:", error);
        }
    };

    return (
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col">
                    Editar Tarefa
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleFormSubmit}>
                        <Input
                            isRequired
                            name="titulo"
                            label="Título da Tarefa"
                            onChange={handleInputChange}
                            value={formData.titulo}
                        />
                        <Input
                            className="mt-2"
                            name="descricao"
                            label="Descrição"
                            onChange={handleInputChange}
                            value={formData.descricao}
                        />
                        <I18nProvider locale="pt-BR">
                            <DatePicker
                                className="mt-2"
                                isRequired
                                name="data_vencimento"
                                label="Data Limite"
                                granularity="day"
                                value={parseDate(formData.data_vencimento)} // Certifique-se de que está passando a data
                                onChange={handleDateChange}
                            />
                        </I18nProvider>
                        <TimeInput
                            className="mt-2"
                            isRequired
                            name="horario_vencimento"
                            label="Horário Limite"
                            value={parseTime(formData.horario_vencimento)} // Converte a string "HH:MM:SS" para TimeValue
                            onChange={handleTimeChange}
                        />
                        <Select
                            className="mt-2"
                            name="status"
                            label="Selecione o Status"
                            value={formData.status}  // Inicia com o valor presente em tarefa.status
                            onChange={(e: SyntheticEvent) => handleStatusChange((e.target as HTMLSelectElement).value)}
                            defaultSelectedKeys={[formData.status]}
                        >
                            {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <div className="flex flex-col-reverse sm:flex-row mt-4 sm:space-x-2 mb-4">
                            <Button color="danger" variant="flat" onPress={onClose} className="w-full mt-2 sm:mt-0">
                                Cancelar
                            </Button>
                            <Button color="primary" type="submit" className="w-full sm:mt-0">
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
