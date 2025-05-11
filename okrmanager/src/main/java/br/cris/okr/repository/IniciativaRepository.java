package br.cris.okr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.cris.okr.model.Iniciativa;

public interface IniciativaRepository extends JpaRepository<Iniciativa, Long> {
}
