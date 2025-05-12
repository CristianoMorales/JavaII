package br.cris.okr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.cris.okr.model.Iniciativa;
import br.cris.okr.model.Objetivo;
import br.cris.okr.model.ResultadoChave;
import br.cris.okr.repository.IniciativaRepository;
import br.cris.okr.repository.ObjetivoRepository;
import br.cris.okr.repository.ResultadoChaveRepository;

@Service
public class IniciativaService {

    @Autowired
    private IniciativaRepository iniciativaRepository;

    @Autowired
    private ResultadoChaveRepository resultadoChaveRepository;

    @Autowired
    private ObjetivoRepository objetivoRepository;

    public Iniciativa criar(Iniciativa iniciativa) {
        Iniciativa criada = iniciativaRepository.save(iniciativa);
        atualizarKR(iniciativa.getResultadoChave().getId());
        return criada;
    }

    public Iniciativa atualizar(Long id, Iniciativa atualizada) {
        Iniciativa iniciativa = iniciativaRepository.findById(id).orElseThrow();
        iniciativa.setTitulo(atualizada.getTitulo());
        iniciativa.setDescricao(atualizada.getDescricao());
        iniciativa.setPorcentagemConclusao(atualizada.getPorcentagemConclusao());
        Iniciativa salva = iniciativaRepository.save(iniciativa);
        atualizarKR(iniciativa.getResultadoChave().getId());
        return salva;
    }

    public void deletar(Long id) {
        Iniciativa iniciativa = iniciativaRepository.findById(id).orElseThrow();
        Long resultadoChaveId = iniciativa.getResultadoChave().getId();
        iniciativaRepository.deleteById(id);
        atualizarKR(resultadoChaveId);
    }

    // Lógica de atualização em cadeia
    private void atualizarKR(Long resultadoChaveId) {
        ResultadoChave rc = resultadoChaveRepository.findById(resultadoChaveId).orElseThrow();
        List<Iniciativa> iniciativas = rc.getIniciativas();

        double media = iniciativas.stream()
            .mapToDouble(i -> i.getPorcentagemConclusao() != null ? i.getPorcentagemConclusao() : 0.0)
            .average()
            .orElse(0.0);

        rc.setPorcentagemConclusao(media);
        resultadoChaveRepository.save(rc);

        atualizarObjetivo(rc.getObjetivo().getId());
    }

    private void atualizarObjetivo(Long objetivoId) {
        Objetivo obj = objetivoRepository.findById(objetivoId).orElseThrow();
        List<ResultadoChave> krs = obj.getResultadosChave();

        double media = krs.stream()
            .mapToDouble(kr -> kr.getPorcentagemConclusao() != null ? kr.getPorcentagemConclusao() : 0.0)
            .average()
            .orElse(0.0);

        obj.setPorcentagemConclusao(media);
        objetivoRepository.save(obj);
    }

    public List<Iniciativa> listarTodas() {
        return iniciativaRepository.findAll();
    }

    public Optional<Iniciativa> buscarPorId(Long id) {
        return iniciativaRepository.findById(id);
    }
}
