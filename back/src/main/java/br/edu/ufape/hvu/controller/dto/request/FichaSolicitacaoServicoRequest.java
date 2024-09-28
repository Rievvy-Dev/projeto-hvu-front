package br.edu.ufape.hvu.controller.dto.request;

import java.util.Date;

import br.edu.ufape.hvu.model.enums.Acondicionamento;
import br.edu.ufape.hvu.model.enums.TipoMaterial;
import br.edu.ufape.hvu.model.enums.TipoServico;
import org.modelmapper.ModelMapper;

import br.edu.ufape.hvu.config.SpringApplicationContext;
import br.edu.ufape.hvu.model.FichaSolicitacaoServico;
import br.edu.ufape.hvu.model.enums.EstadoConservacao;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter @NoArgsConstructor 
public  class FichaSolicitacaoServicoRequest  {
	private String fichaClinica;
	private TipoServico tipoServico;
	private Date dataHoraObito;
	private Date dataRecebimento;
	private EstadoConservacao estadoConservacao;
	private Acondicionamento acondicionamento;
	private TipoMaterial material;
	private Boolean eutanasia;
	private String historico;
	private String caracteristicasAdicionais;
	private TutorRequest tutor;
	private AnimalRequest animal; 
	private MedicoRequest medico;
	private long id;



	public FichaSolicitacaoServico convertToEntity() {
		ModelMapper modelMapper = (ModelMapper) SpringApplicationContext.getBean("modelMapper");
		FichaSolicitacaoServico obj = modelMapper.map(this, FichaSolicitacaoServico.class);
		return obj;
	}



}
