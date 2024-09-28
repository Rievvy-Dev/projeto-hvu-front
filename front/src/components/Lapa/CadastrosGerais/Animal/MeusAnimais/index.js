import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "./index.module.css";
import SearchBar from '../../../../SearchBar';
import { AdicionarAnimalWhiteButtonLapa } from "../../../../WhiteButton";
import { getAllAnimalTutor, deleteAnimal } from '../../../../../../services/animalService';
import VoltarButton from '@/components/Lapa/VoltarButton';
import ExcluirButton from '@/components/ExcluirButton';
import ErrorAlert from '@/components/ErrorAlert';

function MeusAnimaisList() {
    const [animais, setAnimais] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [deletedAnimalId, setDeletedAnimalId] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const animaisData = await getAllAnimalTutor();
                setAnimais(animaisData);
            } catch (error) {
                console.error('Erro ao buscar animais:', error);
            }
        };
        fetchData();
    }, [deletedAnimalId]); // Adicione deletedAnimalId como uma dependência

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const filteredAnimais = animais.filter(animal =>
        animal.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteAnimal = async (animalId) => {
        try {
            await deleteAnimal(animalId);
            setShowAlert(true); 
            setDeletedAnimalId(animalId); // Atualiza o estado para acionar a recuperação da lista
        } catch (error) {
            console.error('Erro ao excluir o animal: ', error);
            setShowErrorAlert(true);
        }
    }

    return (
        <div className={styles.container}>
            < VoltarButton />

            <h1>Meus animais</h1>

            <div className={styles.navbar}>
                <SearchBar
                    placeholder={"Buscar animal"}
                    onSearchChange={handleSearchChange}
                />
                <AdicionarAnimalWhiteButtonLapa />
            </div>

            {filteredAnimais.length === 0 ? (
                <p className={styles.message}>Não há animais cadastrados.</p>
            ) : (
                <ul className={styles.lista}>
                    {filteredAnimais.map(animal => (
                        <li key={animal.id} className={styles.info_box}>
                            <div className={styles.info}>
                                <h6>Paciente</h6>
                                <p>{animal.nome}</p>
                            </div>
                            <div className={styles.info}>
                                <h6>Espécie</h6>
                                <p>{animal.raca && animal.raca.especie && animal.raca.especie.nome}</p>
                            </div>
                            <div className={styles.button_box}>
                                <button
                                    className={styles.acessar_button}
                                    onClick={() => router.push(`/lapa/getAnimalById/${animal.id}`)}
                                >
                                    Visualizar
                                </button>
                                < ExcluirButton itemId={animal.id} onDelete={handleDeleteAnimal} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showAlert && <ErrorAlert message="Animal excluído com sucesso!" show={showAlert} />}
            {showErrorAlert && <ErrorAlert message="Erro ao excluir o animal, pois ele possui agendamento." show={showErrorAlert} />}
        </div>
    );
}

export default MeusAnimaisList;
