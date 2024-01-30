CREATE DATABASE database_centro_cristiano_colon;

USE database_centro;


/* usuarios */
CREATE TABLE users(
    id INT (11) NOT NULL,
    username VARCHAR (50) NOT NULL,
    password VARCHAR (50) NOT NULL,
    cargo_en_la_iglesia VARCHAR (50) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);


ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;


/* planilla */
CREATE TABLE planilla (
    id INT(11) NOT NULL,
    nombre_grupo VARCHAR(500) NOT NULL,
    lider VARCHAR(500) NOT NULL,
    anfrition VARCHAR(500) NOT NULL,
    ofrenda VARCHAR(500) NOT NULL,
    direccion VARCHAR(500) NOT NULL,
    felipes VARCHAR(500) NOT NULL,
    asistentes VARCHAR (500) NOT NULL,
    niños VARCHAR (500) NOT NULL,
    ausentes VARCHAR(500) NOT NULL,
    novedades VARCHAR(500) NOT NULL,
    fecha VARCHAR(500) NOT NULL,
    area VARCHAR(500) NOT NULL,
    acompañamiento VARCHAR(500) NOT NULL,
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE planilla
  ADD PRIMARY KEY (id);

ALTER TABLE planilla
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
  
  
  
CREATE TABLE nuevos (
    id INT(11) NOT NULL,
    tienes VARCHAR (500) NOT NULL,
    cantidad_bautizar VARCHAR (500) NOT NULL,
    persona_nueva1 VARCHAR(500) NOT NULL,
    persona_nueva_contacto1 VARCHAR (500) NOT NULL,
    persona_nueva_edad1 VARCHAR (500) NOT NULL,
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE nuevos
  ADD PRIMARY KEY (id);

ALTER TABLE nuevos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


  

CREATE TABLE bautizos (
    id INT(11) NOT NULL,
    persona_nueva_bautizar1 VARCHAR(500) NOT NULL,
    persona_contacto_bautizo1 VARCHAR (500) NOT NULL,
    persona_edad_bautizar1 VARCHAR (500) NOT NULL,
    
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE bautizos
  ADD PRIMARY KEY (id);

ALTER TABLE bautizos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;