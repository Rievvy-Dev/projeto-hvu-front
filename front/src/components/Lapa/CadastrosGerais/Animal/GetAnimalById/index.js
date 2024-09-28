import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "./index.module.css";
import { getAnimalById } from '../../../../../../services/animalService'; 
import VoltarButton from '@/components/Lapa/VoltarButton';
import { EditarWhiteButton } from '@/components/WhiteButton'; 

function GetAnimalByIdForm() {
    const router = useRouter();
    const { id } = router.query;
    const [animal, setAnimal] = useState({});

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const animalData = await getAnimalById(id);
                    setAnimal(animalData);
                } catch (error) {
                    console.error('Erro ao buscar animal:', error);
                }
            };
            fetchData();
        }
    }, [id]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1); // Adicionando um dia para corrigir a subtração incorreta
        return date.toLocaleDateString('pt-BR', options);
    };
    

    return (
        <div className={styles.container}>
            < VoltarButton />
            <h1>Informações do animal</h1>
            <ul>
                {animal && ( 
                    <li key={animal.id} className={styles.infos_box}>
                        <div className={styles.identificacao}>
                            <div className={styles.especie_animal}>Nome</div>
                            <div className={styles.nome_animal}>{animal.nome}</div>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.box}>
                                <div className={styles.lista}>
                                    <div className={styles.infos}>
                                        <h6>Espécie</h6>
                                        <p>{animal.raca && animal.raca.especie && animal.raca.especie.nome}</p>
                                    </div>
                                    <div className={styles.infos}>
                                        <h6>Sexo</h6>
                                        <p>{animal.sexo}</p>
                                    </div>
                                    <div className={styles.infos}>
                                        <h6>Peso</h6>
                                        <p>{animal.peso === 0 || animal.peso === '' ? 'Não definido' : animal.peso}</p>
                                    </div>
                                </div>

                                <div className={styles.lista}>
                                    <div className={styles.infos}>
                                        <h6>Raça</h6>
                                        <p>{animal.raca && animal.raca.nome}</p>
                                    </div>
                                    <div className={styles.infos}>
                                        <h6>Porte</h6>
                                        <p>{animal.raca && animal.raca.porte ? animal.raca && animal.raca.porte : 'Não definido'}</p>
                                    </div>
                                    <div className={styles.infos}>
                                        <h6>Data de nascimento</h6>
                                        <p>{animal.dataNascimento ? formatDate(animal.dataNascimento) : 'Não definida'}</p>
                                    </div>
                                </div>

                                <div className={styles.lista}>
                                    <div className={styles.infos}>
                                        <h6>Alergias</h6>
                                        <p>{animal.alergias ? animal.alergias : 'Não definidas'}</p>
                                    </div>
                                    <div className={styles.infos}>
                                        <h6>Número da ficha</h6>
                                        <p>{animal.numeroFicha ? animal.numeroFicha : 'Não definido'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.botao}>
                                <EditarWhiteButton page={"/lapa/updateAnimalByTutor"} id={animal.id}/>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default GetAnimalByIdForm;
