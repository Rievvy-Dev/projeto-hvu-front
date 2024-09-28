import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import VoltarButton from "../VoltarButton";
import { getVagaMedico } from '../../../services/vagaService';
import { format } from 'date-fns'; 

export default function AgendamentosByMedico() {
    const router = useRouter();
    const { id } = router.query;
    console.log("id", id);

    const [agendamentos, setAgendamentos] = useState([]);
    console.log("agendamentos:", agendamentos);

    const formatDate = (data) => {
        const year = data.getFullYear();
        const month = String(data.getMonth() + 1).padStart(2, '0');
        const day = String(data.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [data, setData] = useState(formatDate(new Date()));
    console.log("data:", data);

    const handleDataChange = (event) => {
        setData(event.target.value);
    };

    const filterAgendamentosByDate = (agendamentos, targetDate) => {
    const filteredAgendamentos = agendamentos.filter(agendamento => {
        const agendamentoDate = new Date(agendamento.dataHora);
        const formattedAgendamentoDate = formatDate(agendamentoDate);
        return formattedAgendamentoDate === targetDate;
    });
    return filteredAgendamentos;
};

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id && data) {
                    const agendamentosData = await getVagaMedico(id, data);
                    const filteredAgendamentos = filterAgendamentosByDate(agendamentosData, data);
                    setAgendamentos(filteredAgendamentos);
                } else {
                    setAgendamentos([]);
                    console.log("O id ou a data estão indefinidos.");
                }
            } catch (error) {
                console.error('Erro ao buscar agendamentos do médico:', error);
            }
        };        
        fetchData();
    }, [id, data]);

    // Função para filtrar os agendamentos com base no nome do animal
    const filteredAgendamentos = agendamentos.filter(agendamento =>
        agendamento.animal && agendamento.animal.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const compareDates = (a, b) => {
        const dateA = new Date(a.dataVaga);
        const dateB = new Date(b.dataVaga);
        return dateB - dateA;
    };
    
    // Ordena os agendamentos com base nas datas
    const sortedAgendamentos = agendamentos.sort(compareDates);

    return (
        <div>
            <div className={styles.voltar}>
                <VoltarButton />
            </div>

            <div className={styles.main}>
            <div className={styles.titleMeusAgendamentos}>
                <h1>Agendamentos do dia</h1>
            </div>
            
            <div className={`col ${styles.col}`}>
                <label htmlFor="data" className="form-label">Data:</label>
                <input
                    placeholder="Digite a data"
                    type="date"
                    className={`form-control ${styles.input}`}
                    name="data"
                    value={data}
                    onChange={handleDataChange}
                />
            </div>

            {agendamentos.length === 0 ? (
                <div className={styles.message}>Não há consultas marcadas para este dia.</div>
            ) : (
                <ul className={styles.list}>
                    {agendamentos.map(agendamento => (
                        <li key={agendamento.id} className={styles.info_container}>
                            <div className={styles.agendamentos}>
                                <div className={styles.agendamentoBox}>
                                    <div>
                                        <h1>{agendamento.tipoConsulta && agendamento.tipoConsulta.tipo}</h1>
                                        <h2>{format(new Date(agendamento.dataHora), 'dd/MM \'às\' HH:mm')}</h2>
                                    </div>
                                    <div>
                                        <h1>Paciente</h1>
                                        <h2>{agendamento.agendamento && agendamento.agendamento.animal && agendamento.agendamento.animal.nome}</h2>
                                    </div>
                                    <div>
                                        <h1>Especialidade</h1>
                                        <h2>{agendamento.especialidade && agendamento.especialidade.nome}</h2>
                                    </div>
                                    <div> 
                                        <button className={styles.acessar_button} onClick={() => router.push(`/getAgendamentoByMedicoById/${agendamento.id}`)}>
                                            Visualizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    )
}
