/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
package br.cris.okr.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class ResultadoChave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private String meta;

    private Double porcentagemConclusao = 0.0;

    @ManyToOne
    @JoinColumn(name = "objetivo_id")
    @JsonBackReference // evita loop infinito
    private Objetivo objetivo;

    @OneToMany(mappedBy = "resultadoChave", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Iniciativa> iniciativas;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getMeta() {
        return meta;
    }

    public void setMeta(String meta) {
        this.meta = meta;
    }

    public Double getPorcentagemConclusao() {
        return porcentagemConclusao;
    }

    public void setPorcentagemConclusao(Double porcentagemConclusao) {
        this.porcentagemConclusao = porcentagemConclusao;
    }

    public Objetivo getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(Objetivo objetivo) {
        this.objetivo = objetivo;
    }

    public List<Iniciativa> getIniciativas() {
        return iniciativas;
    }

    public void setIniciativas(List<Iniciativa> iniciativas) {
        this.iniciativas = iniciativas;
    }
}
