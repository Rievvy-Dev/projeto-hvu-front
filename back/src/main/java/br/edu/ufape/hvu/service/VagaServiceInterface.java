package br.edu.ufape.hvu.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import br.edu.ufape.hvu.model.*;

public interface VagaServiceInterface {
	Vaga saveVaga(Vaga o);
	Vaga findVagaById(long id);
	Vaga updateVaga(Vaga u);
	void deleteVaga(Vaga u);
	void deleteVaga(long id);
	List<Vaga> getAllVaga();
	List<Vaga> findVagaByEspecialidade(Especialidade especialidade);
	Vaga findVagaByAgendamento(Agendamento agendamento);
	List<Vaga> findVagasByData(LocalDate data);
	List<Vaga> findVagasByDataAndTurno(LocalDate data, String turno);
	List<Vaga> findVagasByDataAndEspecialidade(LocalDate data, Especialidade especialidade);
	List<Vaga> findVagasByDataAndEspecialidadeAndMedico(LocalDate data, Especialidade especialidade, Medico medico);
	List<Vaga> findVagasAndAgendamentoByMedico (LocalDate data, Medico medico);    
	List<Vaga> findLatestVagaForEachAnimal();
	List<Vaga> findLatestVagaForEachAnimalNotReturn();
	List<Vaga> findVagaBetweenInicialAndFinalDate(LocalDate dataInicial, LocalDate dataFinal);
	Vaga findVagaByConsulta(Consulta consulta);
}