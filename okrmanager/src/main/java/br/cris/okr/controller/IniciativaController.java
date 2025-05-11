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

import br.cris.okr.model.Iniciativa;
import br.cris.okr.service.IniciativaService;

@RestController
@RequestMapping("/api/iniciativas")
@CrossOrigin(origins = "*")
public class IniciativaController {

    @Autowired
    private IniciativaService service;

    @PostMapping
    public ResponseEntity<Iniciativa> criar(@RequestBody Iniciativa iniciativa) {
        return ResponseEntity.ok(service.criar(iniciativa));
    }

    @GetMapping
    public ResponseEntity<List<Iniciativa>> listar() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Iniciativa> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Iniciativa> atualizar(@PathVariable Long id, @RequestBody Iniciativa atualizada) {
        return ResponseEntity.ok(service.atualizar(id, atualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
