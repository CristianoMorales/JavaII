package br.cris.okr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.cris.okr.model.ResultadoChave;
import br.cris.okr.repository.ResultadoChaveRepository;

@Service
public class ResultadoChaveService {

    @Autowired
    private ResultadoChaveRepository repository;

    public ResultadoChave criar(ResultadoChave resultadoChave) {
        return repository.save(resultadoChave);
    }

    public List<ResultadoChave> listarTodos() {
        return repository.findAll();
    }

    public Optional<ResultadoChave> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public ResultadoChave atualizar(Long id, ResultadoChave atualizado) {
        return repository.findById(id).map(rc -> {
            rc.setDescricao(atualizado.getDescricao());
            rc.setMeta(atualizado.getMeta());
            rc.setPorcentagemConclusao(atualizado.getPorcentagemConclusao());
            rc.setIniciativas(atualizado.getIniciativas());
            return repository.save(rc);
        }).orElseThrow(() -> new RuntimeException("Resultado-chave não encontrado"));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
