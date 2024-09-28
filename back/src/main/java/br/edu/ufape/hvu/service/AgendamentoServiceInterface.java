package br.edu.ufape.hvu.service;

import java.util.List;

import br.edu.ufape.hvu.model.Agendamento;
import br.edu.ufape.hvu.model.Animal;

public interface AgendamentoServiceInterface {
	Agendamento saveAgendamento(Agendamento o);
	Agendamento findAgendamentoById(long id);
	Agendamento updateAgendamento(Agendamento u);
	void deleteAgendamento(Agendamento u);
	void deleteAgendamento(long id);
	List<Agendamento> getAllAgendamento();
	List<Agendamento> findAgendamentosByMedicoId(Long medicoId);
	List<Agendamento> findAgendamentosByAnimal(Animal animal);
    
    

    
}