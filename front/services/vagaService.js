import api from '../common/http-common-back';

// Função para criar vaga especial
export async function createVagaEspecial(vagaData) {
  try {
    const response = await api.post('/vaga', vagaData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Função para criar vaga normal
export async function createVagaNormal(vagaData) {
  try {
    const response = await api.post('/gestao-vagas/criar', vagaData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Função para buscar todas 
export async function getAllVaga() {
  try {
    const response = await api.get('/vaga');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Função para buscar por ID
export async function getVagaById(vagaId) {
  try {
    const response = await api.get(`/vaga/${vagaId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVagaMedico(medicoId, data) {
  try {
    const response = await api.get(`/vaga/medico/${medicoId}/${data}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Função para atualizar 
export async function updateVaga(vagaId, vagaData) {
  try {
    const response = await api.patch(`/vaga/${vagaId}`, vagaData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Função para excluir
export async function deleteVaga(vagaId) {
  try {
    const response = await api.delete(`/vaga/${vagaId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Função para cancelar vaga sem agendamento
export async function cancelarVaga(cancelamentoData) {
  try {
    const response = await api.post(`/cancelamento/vaga`, cancelamentoData);
  } catch (error) {
    throw error;
  }
}

export async function getVagaByAgendamento(agendamentoId) {
  try {
    const response = await api.get(`/vaga/agendamento/${agendamentoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Função para pegar vaga pela data
export async function getVagaByDate(date) {
  try {
    const response = await api.get(`vaga/data/${date}`)
    return response.data
  } catch (error) {
    throw error;
  }
}

//Função para pegar vaga por período
export async function getVagaByPeriod(dateInicio, dateFim) {
  try {
    const response = await api.get(`vaga/data/${dateInicio}/${dateFim}`)
    return response.data
  } catch (error) {
    throw error;
  }
}