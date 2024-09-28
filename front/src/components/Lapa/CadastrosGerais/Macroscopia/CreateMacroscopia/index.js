import React, { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.module.css";
import VoltarButton from "../../../VoltarButton";
import { CancelarWhiteButton } from "../../../../WhiteButton";
import { createCampoLaudo } from "../../../../../../services/campoLaudoService";
import Alert from "../../../../Alert";
import ErrorAlert from "../../../../ErrorAlert";
import OrgaosList from "@/hooks/useOrgaoList";

function CreateCampoLaudo() {
    const router = useRouter();
    const { orgaos, error } = OrgaosList(); // Usando o hook para obter órgãos

    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errors, setErrors] = useState({});
    const [campoLaudo, setCampoLaudo] = useState({
        descricao: "",
        orgao: { id: null }
    });

    const handleCampoLaudoChange = (event) => {
        const { name, value } = event.target;
        setCampoLaudo({ ...campoLaudo, [name]: value });
    };

    const handleOrgaoChange = (event) => {
        const selectedId = event.target.value;
        setCampoLaudo({ ...campoLaudo, orgao: { id: selectedId } });
    };

    const validateForm = () => {
        const errors = {};
        if (!campoLaudo.descricao) {
            errors.descricao = "Campo obrigatório";
        }
        if (!campoLaudo.orgao.id) {
            errors.orgao = "Selecione um órgão";
        }
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        try {
            await createCampoLaudo(campoLaudo);
            setShowAlert(true);
        } catch (error) {
            console.error("Erro ao criar campo laudo:", error);
            setShowErrorAlert(true);
        }
    };

    if (error) {
        return <div>Erro ao carregar órgãos: {error.message}</div>; // Tratamento de erro ao buscar órgãos
    }

    return (
        <div className={styles.container}>
            <VoltarButton />
            <h1>Adicionar Campo de Laudo</h1>
            <form className={styles.inputs_container}>
                <div className={styles.inputs_box}>
                    <div className="row">
                        <div className={`col ${styles.col}`}>
                            <label htmlFor="descricao" className="form-label">
                                Descrição <span className={styles.obrigatorio}>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Digite a descrição do campo"
                                className={`form-control ${styles.input} ${errors.descricao ? "is-invalid" : ""}`}
                                name="descricao"
                                value={campoLaudo.descricao}
                                onChange={handleCampoLaudoChange}
                            />
                            {errors.descricao && <div className={`invalid-feedback ${styles.error_message}`}>{errors.descricao}</div>}
                        </div>
                        <div className={`col ${styles.col}`}>
                            <label htmlFor="orgao" className="form-label">
                                Órgão <span className={styles.obrigatorio}>*</span>
                            </label>
                            <select
                                className={`form-select ${styles.input} ${errors.orgao ? "is-invalid" : ""}`}
                                name="orgao"
                                onChange={handleOrgaoChange}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecione um órgão</option>
                                {orgaos.map(orgao => (
                                    <option key={orgao.id} value={orgao.id}>{orgao.nome}</option>
                                ))}
                            </select>
                            {errors.orgao && <div className={`invalid-feedback ${styles.error_message}`}>{errors.orgao}</div>}
                        </div>
                    </div>
                </div>
                <div className={styles.button_box}>
                    <CancelarWhiteButton />
                    <button type="button" className={styles.criar_button} onClick={handleSubmit}>
                        Criar
                    </button>
                </div>
            </form>
            {showAlert && <Alert message="Campo de laudo criado com sucesso!" show={showAlert} url={`/lapa/gerenciarMacroscopias`} />}
            {showErrorAlert && <ErrorAlert message="Erro ao cadastrar campo de laudo, tente novamente." show={showErrorAlert} />}
        </div>
    );
}

export default CreateCampoLaudo;
