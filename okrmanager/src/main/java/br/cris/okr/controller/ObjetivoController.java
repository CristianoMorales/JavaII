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

import br.cris.okr.model.Objetivo;
import br.cris.okr.service.ObjetivoService;

@RestController
@RequestMapping("/api/objetivos")
@CrossOrigin(origins = "*") // permite chamadas de qualquer origem (frontend depois)
public class ObjetivoController {

    @Autowired
    private ObjetivoService objetivoService;

    @PostMapping
    public ResponseEntity<Objetivo> criar(@RequestBody Objetivo objetivo) {
        return ResponseEntity.ok(objetivoService.criarObjetivo(objetivo));
    }

    @GetMapping
    public ResponseEntity<List<Objetivo>> listar() {
        return ResponseEntity.ok(objetivoService.listarObjetivos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Objetivo> buscarPorId(@PathVariable Long id) {
        return objetivoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Objetivo> atualizar(@PathVariable Long id, @RequestBody Objetivo objetivo) {
        return ResponseEntity.ok(objetivoService.atualizarObjetivo(id, objetivo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        objetivoService.deletarObjetivo(id);
        return ResponseEntity.noContent().build();
    }
}
