/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
package br.cris.okr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cris.okr.model.ResultadoChave;
import br.cris.okr.service.ResultadoChaveService;

@RestController
@RequestMapping("/api/krs")
@CrossOrigin(origins = "*")
public class ResultadoChaveController {

    @Autowired
    private ResultadoChaveService service;

    @PostMapping
    public ResponseEntity<ResultadoChave> criar(@RequestBody ResultadoChave kr) {
        return ResponseEntity.ok(service.criar(kr));
    }

    @GetMapping
    public ResponseEntity<List<ResultadoChave>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultadoChave> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResultadoChave> atualizar(@PathVariable Long id, @RequestBody ResultadoChave atualizado) {
        return ResponseEntity.ok(service.atualizar(id, atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
