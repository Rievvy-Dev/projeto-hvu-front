package br.edu.ufape.hvu.repository.seeders;


import br.edu.ufape.hvu.model.Endereco;
import br.edu.ufape.hvu.model.Tutor;
import br.edu.ufape.hvu.repository.TutorRepository;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component @RequiredArgsConstructor
public class TutorSeeder {
    final private TutorRepository tutorRepository;
    final private UsuarioSeeder usuarioSeeder;

    public void init(){
        if(tutorRepository.count() > 0){
            return;
        }

        Faker faker = new Faker(new Locale("pt-BR"));


        Endereco endereco = usuarioSeeder.criarEndereco(faker);

        Tutor tutor = criarTutor(faker, endereco);

        tutorRepository.save(tutor);



    }

    protected Tutor criarTutor(Faker faker, Endereco endereco){
        Tutor tutor = new Tutor();
        tutor.setNome("tutor");
        tutor.setEmail("tutor@tutor.com");
        tutor.setTelefone(faker.phoneNumber().phoneNumber());
        tutor.setDeleted(false);
        tutor.setCpf(faker.idNumber().valid());
        tutor.setSenha("password");
        tutor.setEndereco(endereco);
        tutor.setRg(faker.idNumber().valid());
        tutor.setUserId("6008c99e-7907-441f-b212-cec0d2b0687e");
        return tutor;
    }
}
