/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
package br.cris.okr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Iniciativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private Double porcentagemConclusao;

    @ManyToOne
    @JoinColumn(name = "resultado_chave_id")
    @JsonBackReference
    private ResultadoChave resultadoChave;

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

    public ResultadoChave getResultadoChave() {
        return resultadoChave;
    }

    public void setResultadoChave(ResultadoChave resultadoChave) {
        this.resultadoChave = resultadoChave;
    }
}
