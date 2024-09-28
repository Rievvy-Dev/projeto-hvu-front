package br.edu.ufape.hvu.controller.dto.request;

import org.modelmapper.ModelMapper;

import br.edu.ufape.hvu.config.SpringApplicationContext;
import br.edu.ufape.hvu.model.AvaliacaoFisicoGeral;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter @NoArgsConstructor 
public  class AvaliacaoFisicoGeralRequest  {
	private String temperatura;
	private String frequenciaCardiaca;
	private String frequenciaRespiratoria;
	private String tpc;
	private TipoMucosaRequest tipoMucosa; 
	private NivelConscienciaRequest nivelConsciencia; 
	private TipoTurgorCutaneoRequest tipoTurgorCutaneo; 
	private NivelHidratacaoRequest nivelHidratacao; 
	private TipoLinfonodosRequest tipoLinfonodos; 
	private ScoreCorporalRequest scoreCorporal; 
	private TipoPosturaRequest tipoPostura;
	private long id;


	public AvaliacaoFisicoGeral convertToEntity() {
		ModelMapper modelMapper = (ModelMapper) SpringApplicationContext.getBean("modelMapper");
		AvaliacaoFisicoGeral obj = modelMapper.map(this, AvaliacaoFisicoGeral.class);
		return obj;
	}



}
