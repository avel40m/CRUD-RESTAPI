package com.example.controller;

import java.util.List;
import java.util.Optional;

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

import com.example.interfaz.AlumnoInterface;
import com.example.modelo.Alumno;

@RestController
@RequestMapping("/alumnos")
@CrossOrigin("*")
public class AlumnoController {
	@Autowired
	private AlumnoInterface alumnoInterface;
	
	@GetMapping("/ver")
	public List<Alumno> verAlumnos(){
		return alumnoInterface.findAll();
	}
	
	@PostMapping("/guardar")
	public ResponseEntity<?> guardarAlumno(@RequestBody Alumno alumno) {
		try {
			alumnoInterface.save(alumno);
			return ResponseEntity.ok(Boolean.TRUE);
		} catch (Exception e) {
			System.out.println(e.getMessage());			
		}
		return ResponseEntity.ok(Boolean.FALSE);
	}
	
	@PutMapping("/actualizar/{id}")
	public ResponseEntity<?> actualizarAlumno(@PathVariable int id,@RequestBody Alumno alumno) {
		Optional<Alumno> buscarId = alumnoInterface.findById(id);
		
		if (buscarId.isEmpty()) {
			return ResponseEntity.ok(Boolean.FALSE);
		} else {
			Alumno a = buscarId.get();
			a.setNombre(alumno.getNombre());
			a.setApellido(alumno.getApellido());
			a.setEdad(alumno.getEdad());
			a.setDni(alumno.getDni());
			alumnoInterface.save(a);
			return ResponseEntity.ok(Boolean.TRUE);
		}
	}
	
	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<?> eliminarAlumno(@PathVariable int id) {
		Optional<Alumno> buscarId = alumnoInterface.findById(id);
		if (buscarId.isEmpty()) {
			return ResponseEntity.ok(Boolean.TRUE);
		} else {
			alumnoInterface.deleteById(id);
			return ResponseEntity.ok(Boolean.FALSE);
		}
	}

	@GetMapping("/obtener/{id}")
	public Alumno obtenerAlumno(@PathVariable int id) {
		Optional<Alumno> alumno = alumnoInterface.findById(id);
		if (alumno.isEmpty()) {
			return null;
		} else {
			return alumno.get();
		}
	}
	
	@GetMapping("/buscar/{valor}")
	public List<Alumno> alumnoContaining(@PathVariable String valor){
		return alumnoInterface.findByApellidoContaining(valor);
	}
	
	@GetMapping("/ordenarApellidoAsc")
	public List<Alumno> orderApellidoAsc(){
		return alumnoInterface.orderApellidoAsc();
	}
	
	@GetMapping("/ordenarApellidoDesc")
	public List<Alumno> orderApellidoDesc(){
		return alumnoInterface.orderApellidoDesc();
	}
	
	@GetMapping("/ordenarNombreAsc")
	public List<Alumno> orderNombreAsc(){
		return alumnoInterface.orderNombreAsc();
	}
	
	@GetMapping("/ordenarNombreDesc")
	public List<Alumno> orderNombreDesc(){
		return alumnoInterface.orderNombreDesc();
	}
	
	@GetMapping("/ordenarEdadAsc")
	public List<Alumno> orderEdadAsc(){
		return alumnoInterface.orderEdadAsc();
	}
	
	@GetMapping("/ordenarEdadDesc")
	public List<Alumno> orderEdadDesc(){
		return alumnoInterface.orderEdadDesc();
	}

	@GetMapping("/ordenarDniAsc")
	public List<Alumno> orderDniAsc(){
		return alumnoInterface.orderDniAsc();
	}
	
	@GetMapping("/ordenarDniDesc")
	public List<Alumno> orderDniDesc(){
		return alumnoInterface.orderDniDesc();
	}
}
