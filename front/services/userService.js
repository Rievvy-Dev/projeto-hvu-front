import api from '../common/http-common-back'; // Importe a instância do Axios com o token de autorização

  // Função para criar um novo usuário
export async function createUsuario(usuarioData) {
    try {
      const response = await api.post('/usuario', usuarioData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  // Função para buscar todos os usuarios
  export async function getAllUsuarios() {
    try {
      const response = await api.get('/usuario');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export async function getCurrentUsuario() {
    try {
      const response = await api.get('/usuario/current');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  // Função para buscar um usuário por ID
  export async function getUsuarioById(usuarioId) {
    try {
      const response = await api.get(`/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  // Função para atualizar um usuario
  export async function updateUsuario(usuarioId, usuarioData) {
    try {
      const response = await api.patch(`/usuario/${usuarioId}`, usuarioData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  // Função para excluir um usuario por ID
  export async function deleteUsuario(usuarioId) {
    try {
      const response = await api.delete(`/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

