package com.example.interfaz;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.modelo.Alumno;

@Repository
public interface AlumnoInterface extends JpaRepository<Alumno, Integer> {
	List<Alumno> findByApellidoContaining(String apellido);
	@Query(value = "SELECT * FROM spring.alumno order by apellido", nativeQuery = true)
	List<Alumno> orderApellidoAsc();
	@Query(value = "SELECT * FROM spring.alumno order by apellido desc", nativeQuery = true)
	List<Alumno> orderApellidoDesc();
	@Query(value = "SELECT * FROM spring.alumno order by nombre", nativeQuery = true)
	List<Alumno> orderNombreAsc();
	@Query(value = "SELECT * FROM spring.alumno order by nombre desc", nativeQuery = true)
	List<Alumno> orderNombreDesc();
	@Query(value = "SELECT * FROM spring.alumno order by edad", nativeQuery = true)
	List<Alumno> orderEdadAsc();
	@Query(value = "SELECT * FROM spring.alumno order by edad desc", nativeQuery = true)
	List<Alumno> orderEdadDesc();
	@Query(value = "SELECT * FROM spring.alumno order by dni", nativeQuery = true)
	List<Alumno> orderDniAsc();
	@Query(value = "SELECT * FROM spring.alumno order by dni desc", nativeQuery = true)
	List<Alumno> orderDniDesc();
}
