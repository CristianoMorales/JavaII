package br.cris.okr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.cris.okr.model.Objetivo;

public interface ObjetivoRepository extends JpaRepository<Objetivo, Long> {
}
