package br.edu.ufape.hvu.controller.dto.request;

import org.modelmapper.ModelMapper;

import br.edu.ufape.hvu.config.SpringApplicationContext;
import br.edu.ufape.hvu.model.NivelHidratacao;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter @NoArgsConstructor 
public  class NivelHidratacaoRequest  {
	private String nivel;
	private long id;


	public NivelHidratacao convertToEntity() {
		ModelMapper modelMapper = (ModelMapper) SpringApplicationContext.getBean("modelMapper");
		NivelHidratacao obj = modelMapper.map(this, NivelHidratacao.class);
		return obj;
	}



}
