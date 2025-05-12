/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
package br.cris.okr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.cris.okr.model.Objetivo;

public interface ObjetivoRepository extends JpaRepository<Objetivo, Long> {
}
