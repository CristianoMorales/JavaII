/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
package br.cris.okr.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Objetivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private Double porcentagemConclusao = 0.0;

    @OneToMany(mappedBy = "objetivo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // indica que esse lado será serializado
    private List<ResultadoChave> resultadosChave;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPorcentagemConclusao() {
        return porcentagemConclusao;
    }

    public void setPorcentagemConclusao(Double porcentagemConclusao) {
        this.porcentagemConclusao = porcentagemConclusao;
    }

    public List<ResultadoChave> getResultadosChave() {
        return resultadosChave;
    }

    public void setResultadosChave(List<ResultadoChave> resultadosChave) {
        this.resultadosChave = resultadosChave;
    }
}
