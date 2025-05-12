/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
package br.cris.okr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.cris.okr.model.Objetivo;
import br.cris.okr.repository.ObjetivoRepository;

@Service
public class ObjetivoService {

    @Autowired
    private ObjetivoRepository objetivoRepository;

    public Objetivo criarObjetivo(Objetivo objetivo) {
        return objetivoRepository.save(objetivo);
    }

    public List<Objetivo> listarObjetivos() {
        return objetivoRepository.findAll();
    }

    public Optional<Objetivo> buscarPorId(Long id) {
        return objetivoRepository.findById(id);
    }

    public Objetivo atualizarObjetivo(Long id, Objetivo atualizado) {
        return objetivoRepository.findById(id)
                .map(obj -> {
                    obj.setTitulo(atualizado.getTitulo());
                    obj.setDescricao(atualizado.getDescricao());
                    return objetivoRepository.save(obj);
                }).orElseThrow(() -> new RuntimeException("Objetivo não encontrado"));
    }

    public void deletarObjetivo(Long id) {
        objetivoRepository.deleteById(id);
    }
}
