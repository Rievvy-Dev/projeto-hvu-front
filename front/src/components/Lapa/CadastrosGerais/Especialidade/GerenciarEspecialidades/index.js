import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  
import styles from "./index.module.css";
import SearchBar from '../../../../SearchBar';
import { getAllEspecialidade, deleteEspecialidade } from '../../../../../../services/especialidadeService';
import VoltarButton from '../../../VoltarButton';
import ExcluirButton from '../../../../ExcluirButton';
import ErrorAlert from "../../../../ErrorAlert";

function GerenciarEspecialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deletedEspecialidadeId, setDeletedEspecialidadeId] = useState(null); // Estado para controlar o ID da raça excluída recentemente
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const especialidadesData = await getAllEspecialidade();
                setEspecialidades(especialidadesData);
            } catch (error) {
                console.error('Erro ao buscar especialidades:', error);
            }
        };
        fetchData();
    }, [deletedEspecialidadeId]); // Adicione deletedEspecialidadeId como uma dependência

    const handleDeleteEspecialidade = async (especialidadeId) => {
        try {
            await deleteEspecialidade(especialidadeId);
            setEspecialidades(especialidades.filter(especialidade => especialidade.id !== especialidadeId));
            setDeletedEspecialidadeId(especialidadeId); // Atualiza o estado para acionar a recuperação da lista
            setShowAlert(true); 
        } catch (error) {
            console.error('Erro ao excluir especialidade:', error);
            if (error.response && error.response.status === 409) {
                setShowErrorAlert(true);
            }
        }
    };

    // Função para filtrar as raças com base na opção selecionada
    const filteredEspecialidades = especialidades.filter(especialidade => {
        return especialidade.nome.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <VoltarButton />
            <h1>Listagem de especialidades</h1>

            <div className={styles.navbar_container}>
                <SearchBar placeholder={`Buscar por especialidade`} onSearchChange={setSearchTerm} />
                <button className={styles.adicionar_raca_button} onClick={() => router.push(`/lapa/createEspecialidade`)}>
                    Adicionar especialidade
                </button>
            </div>

            {filteredEspecialidades.length === 0 ? (
                <p className={styles.paragrafo}> Especialidade não existe.</p>
            ) : (
                <ul className={styles.list}>
                    {filteredEspecialidades.map(especialidade => (
                        <li key={especialidade.id} className={styles.info_container}>
                            <div className={styles.info_box}>
                                <h6>Especialidade</h6>
                                <p>{especialidade.nome}</p>
                            </div>
                            <div className={styles.info_box}>
                                <h6></h6>
                                <p></p>
                            </div>
                            <div  className={styles.button_container}>
                                <button
                                    className={styles.editar_button}
                                    onClick={() => router.push(`/lapa/updateEspecialidade/${especialidade.id}`)}
                                >
                                    Editar
                                </button>
                                <ExcluirButton itemId={especialidade.id} onDelete={handleDeleteEspecialidade} /> 
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showAlert && <ErrorAlert message="Especialidade excluída com sucesso!" show={showAlert} />}
            {showErrorAlert && <ErrorAlert message="Esta especialidade não pode ser excluída por estar associada a um(a) veterinário(a)." show={showErrorAlert} />}

        </div>
    );
}

export default GerenciarEspecialidades;
