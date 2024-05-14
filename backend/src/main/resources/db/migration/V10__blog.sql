create table blog
(
    id                int primary key auto_increment,
    title             varchar(255),
    data              text,
    modification_date datetime,
    published         boolean
);

insert into blog (title, data, modification_date, published)
values ('¡La primera entrada!',
        '<h1><strong>¡Bienvenidos al Blog del Concesionario ULPGC!</strong></h1><p><br></p><p>En el Concesionario ULPGC, estamos comprometidos a brindarte la mejor experiencia automotriz. Nuestro blog es tu destino para mantenerte al día con las últimas noticias, consejos útiles y emocionantes historias del mundo de los autos.</p><h3><br></h3><h3><strong style="background-color: rgb(235, 214, 255);">Novedades y Tendencias</strong></h3><p>Descubre lo último en el mundo automotriz:</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Modelos Destacados</strong>: Explora nuestros últimos modelos de automóviles, desde deportivos elegantes hasta SUVs familiares.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Avances Tecnológicos</strong>: Mantente al tanto de las últimas innovaciones en tecnología automotriz, desde sistemas de conducción autónoma hasta características de seguridad avanzadas.</li></ol><p><br></p><h3><strong style="color: rgb(61, 20, 102);">Consejos Útiles</strong></h3><p>Optimiza tu experiencia automotriz con nuestros consejos prácticos:</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Mantenimiento Preventivo</strong>: Aprende cómo mantener tu vehículo en óptimas condiciones con nuestros consejos de mantenimiento preventivo.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Conducción Eficiente</strong>: Descubre técnicas para mejorar el rendimiento de tu automóvil y ahorrar combustible en cada viaje.</li></ol><p><br></p><h3><strong>Historias Automotrices</strong></h3><p>Sumérgete en fascinantes historias del mundo de los autos:</p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><strong>Restauraciones Inspiradoras</strong>: Conoce las historias detrás de las emocionantes restauraciones de clásicos automotrices que han pasado por nuestras manos.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><strong>Aventuras en Carretera</strong>: Únete a nosotros en viajes por carretera llenos de aventuras y descubre destinos emocionantes a bordo de nuestros vehículos.</li></ol><p><br></p><h3><strong><u>Únete a la Conversación</u></strong></h3><p>¿Tienes alguna pregunta o quieres compartir tu propia experiencia automotriz? ¡Nos encantaría escucharte!</p><p>¡Únete a la comunidad del Concesionario ULPGC y sé parte de la conversación sobre todo lo relacionado con los autos!</p>',
        '2024-05-10 15:35:36',
        true);

create table blog_subscription
(
    id    int primary key auto_increment,
    email varchar(511)
);