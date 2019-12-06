# xapid3

Material auxiliar para una demo sobre el uso de d3 para visualizar trazas xAPI

## Cómo trabajar con la plantilla

1. descarga el proyecto vía git 
  - con una consola, `git clone https://github.com/manuel-freire/xapid3`
  - o con una interfaz gráfica de git, como por ejemplo sourcetree, o tu IDE favorito
  
2. sirve el contenido del proyecto en un servidor web
  - si tienes php instalado, puedes usar (**desde dentro de la carpeta xapid3**), \
   `ruta-completa-al-ejecutable-de-php/php -S localhost:8000` \
    (la /ruta-completa-al-ejecutable-de-php/ sólo hace falta si php no está bien instalado, como por ejemplo en los laboratorios de la FdI, donde no está en la ruta por defecto)
  - si tienes python2.x, puedes usar (**desde dentro de la carpeta xapid3**), \
   `python -m SimpleHTTPServer 8000`
  - si te gusta más python3, puedes usar (**desde dentro de la carpeta xapid3**), \
   `python -m http.server 8000`
 
3. lanza un navegador apuntando a `http://localhost:8000/`. Recomiendo Firefox ó, en su defecto, Chrome. 
 
4. abre el código en el editor de tu elección. Aquí los ficheros que más te interesan:
  - index.html: donde se junta todo, y se elige qué visualizaciones mostrar y sobre qué datos
  - modelo.js: contiene los datos a mostrar. Hay un par de conjuntos para las visualizaciones de prueba, y luego dos "grandes" conjuntos: `data.a` y `data.b` con los datos de xAPI que queremos analizar
  - vista.js: contiene el código javascript / d3 (d3 es sólo una librería) que define cómo visualizar los datos
  
5. inspírate en las distintas visualizaciones que se han hecho y publicado con d3, decide qué datos mirar, y modifica el código para mostrar esos datos. Si refrescas la vista del navegador, podrás ver si tus cambios sobre el código js han tenido efecto.
