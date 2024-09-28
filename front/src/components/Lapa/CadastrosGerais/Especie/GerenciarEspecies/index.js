import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  
import styles from "./index.module.css";
import SearchBar from '../../../../SearchBar';
import { getAllEspecie, deleteEspecie } from '../../../../../../services/especieService';
import VoltarButton from '../../../VoltarButton';
import ExcluirButton from '../../../../ExcluirButton';
import ErrorAlert from "../../../../ErrorAlert";

function GerenciarEspecies() {
    const [especies, setEspecies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deletedEspecieId, setDeletedEspecieId] = useState(null); // Estado para controlar o ID da raça excluída recentemente
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const especiesData = await getAllEspecie();
                setEspecies(especiesData);
            } catch (error) {
                console.error('Erro ao buscar espécies:', error);
            }
        };
        fetchData();
    }, [deletedEspecieId]); // Adicione deletedEspecieId como uma dependência

    const handleDeleteEspecie = async (especieId) => {
        try {
            await deleteEspecie(especieId);
            setEspecies(especies.filter(especie => especie.id !== especieId));
            setDeletedEspecieId(especieId); // Atualiza o estado para acionar a recuperação da lista
            setShowAlert(true); 
        } catch (error) {
            console.error('Erro ao excluir espécie:', error);
            if (error.response && error.response.status === 409) {
                setShowErrorAlert(true);
            }
        }
    };

    // Função para filtrar as raças com base na opção selecionada
    const filteredEspecies = especies.filter(especie => {
        return especie.nome.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <VoltarButton />
            <h1>Listagem de espécies</h1>

            <div className={styles.navbar_container}>
                <SearchBar placeholder={`Buscar por espécie`} onSearchChange={setSearchTerm} />
                <button className={styles.adicionar_raca_button} onClick={() => router.push(`/lapa/createEspecie`)}>
                    Adicionar espécie
                </button>
            </div>

            {filteredEspecies.length === 0 ? (
                <p className={styles.paragrafo}> Espécie não existe.</p>
            ) : (
                <ul className={styles.list}>
                    {filteredEspecies.map(especie => (
                        <li key={especie.id} className={styles.info_container}>
                            <div className={styles.info_box}>
                                <h6>Espécie</h6>
                                <p>{especie.nome}</p>
                            </div>
                            <div className={styles.info_box}>
                                <h6></h6>
                                <p></p>
                            </div>
                            <div  className={styles.button_container}>
                                <button
                                    className={styles.editar_button}
                                    onClick={() => router.push(`/lapa/updateEspecie/${especie.id}`)}
                                >
                                    Editar
                                </button>
                                <ExcluirButton itemId={especie.id} onDelete={handleDeleteEspecie} /> 
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showAlert && <ErrorAlert message="Especie excluída com sucesso!" show={showAlert} />}
            {showErrorAlert && <ErrorAlert message="Esta especie não pode ser excluída por estar associada a um animal." show={showErrorAlert} />}

        </div>
    );
}

export default GerenciarEspecies;
