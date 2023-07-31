//Intro a Jvascript//


//1 ejercicio:  cerar una variable llamada miNombre y guardar  en ella su primer nombre.
let miNombre = "Bella";

//2 Crear una variable llamada miApellido y guardar en ella su apellido.//
let miApellido = "Vergara";

//3Crear una variable llamada miEdad y guardar en ella su edad.//
let miEdad = 22;

// 4 Crear una variable llamada miMascota y guardar en ella el nombre de su mascota.//
let miMacota = "romeo"

// 5 Crear una variable llamada edadMascota y guardar en ella la edad de la mascota.//
let edadMascota = 5;

//6 Visualizar todas las variables dentro de la consola del navegador escribiendo el  nombre de cada una de ellas.//
console.log(miNombre);
console.log (miApellido);
console.log (miEdad);
console.log(miMacota);
console.log (edadMascota);

//7 Crear una variable llamada nombreCompleto y guardar en ella la concatenación de
//miNombre y miApellido.//
let nombreCompleto = miNombre + miApellido;

//8Crear una variable llamada textoPresentacion y guardar en ella un texto comprendido  con todas las variables creadas hasta el momento.//
let textoPresentacion = ` Hola mi nombre es ${miNombre} ${miApellido},tengo ${miEdad} años. Mi mascota se llama ${miMacota} y tiene ${edadMascota} años.`;
console.log(textoPresentacion);


/* 9 . Crear una variable sumaEdades, restaEdades, productoEdades, divisionEdades y
calcular sus respectivas operaciones con las variables miEdad y edadMascota. */

let edadSumada = miEdad + edadMascota
console.log(edadSumada);

let restaEdades = miEdad - edadMascota
console.log(restaEdades);

let productoEdades= miEdad * edadMascota
console.log(productoEdades);

let divisionEdades = miEdad /  edadMascota
console.log(divisionEdades);


/* 10 Crear un objeto llamado alumno con un mínimo de 5 propiedades, mostrar dicho
objeto utilizando console.table( ) y también mostrar cada una de las propiedades del
objeto por separado.*/
let alumno =  {
    nombreCompleto : "Bella Ivana Vergara",
    edad : 22,
    curso : "MERN",
    cohort : 50,
    promedio : 97,
};
console.table(alumno);
console.log(alumno.nombreCompleto);
console.log(alumno.edad);
console.log(alumno.curso);
console.log(alumno.cohort);
console.log(alumno.promedio);

/* 11 Crear un objeto llamado mascota con un mínimo de 5 propiedades, mostrar dicho
objeto utilizando console.table( ) y también mostrar cada una de las propiedades del
objeto por separado.*/
let mascota = {
    nombreMascota : "Romeo Vergara",
    edad : 5,
    comidaFavorita : "royal Canin",
    juegueteFavorito : "pelota",
    pelaje : "blanco",
};
console.table(mascota);
console.log(mascota.nombreMascota);
console.log(mascota.edad);
console.log(mascota.comidaFavorita);
console.log(mascota.juegueteFavorito);
console.log(mascota.pelaje);

/* 12 Crear un array llamado frutas con un mínimo de 5 elementos y mostrar por consola el
array completo y cada uno de los elementos por separado.*/

let frutas = [ "frutilla","mango", "anana"," banana","uva","maracuya"] 

console.log(frutas);
console.log(frutas[0]);
console.log(frutas[1]);
console.log(frutas[2]);
console.log(frutas[3]);
console.log(frutas[4]);
console.log(frutas[5]);

/* 13Compare su edad ingresada por pantalla con prompt( ) con el número 18 y guardarlo
en una variable llamada soyMayorDeEdad y mostrar por consola un mensaje que diga:
Soy mayor de edad y el valor de la variable.*/

// comparar  mi edad con el numero 18//
//soyMayorDeEdad =  18// 
//mostrar en consola "soy mayor de edad"//
//mostrar valor de variable "soy mayor de edad"//

let soyMayorDeEdad =  Number(prompt("indique su edad por favor")) >=18
console.log(` soy mayor de edad ${soyMayorDeEdad}`);

/* 14 Crear un array llamado numeros con un mínimo de 5 elementos y mostrar por consola
el array completo y cada uno de los elementos por separado.*/

let numeros = [22,26,10,3,1]
console.log([numeros]);
console.log(numeros[0]);
console.log(numeros[1]);
console.log(numeros[2]);
console.log(numeros[3]);
console.log(numeros[4]);


/*  15 Crear un array llamado familia con un mínimo de 5 objetos y mostrar por consola el
array completo y cada uno de los elementos por separado.*/

let familia = [
    { nombre: "debora",edad: 25, relacion:"hermana"},
    { nombre: "lucia",edad: 27, relacion: "hermana"},
    { nombre: "betty", edad:40,relacion :"tia"},
    {nombre : "ciro", edad: 10,relacion: "sobrino"},
    {nombre: "luna", edad:4,relacion:"sobrina"}
]

console.log(familia);
console.log(familia[0]);
console.log(familia[1]);
console.log(familia[2]);
console.log(familia[3]);
console.log(familia[4]);

/* 16 Crear una variable llamada textoAleatorio formando una frase con el segundo
elemento del array del punto 12, el cuarto elemento del punto 14 y el quinto objeto del
array del punto 15.*/

let textoAleatorio = "mi sobrina se llama " + familia[4].nombre + "  tiene " + numeros[3]+ " años " + " y  su  fruta favorita es el  " + frutas[1]
console.log(textoAleatorio);

/* 16 .Utilizar prompt() para leer por pantalla mi edad y la edad de un compañero y mostrar
por consola los resultados de comparar los valores y guardarlos en variables llamadas
por ejemplo: edadesIguales, soyMayor, soyMenor, etc. y mostrar mensajes en consola
como los siguientes:
a. Mi edad es igual a la de mi compañero: false
b. Mi edad es mayor a la de mi compañero: true
c. Mi edad es menor a la de mi compañero: false*/

let edadUsuarioo = Number(prompt("indica tu edad por favor "));
let edadCompaniero = Number(prompt("indica la edad de tu compañero,por favor"));

let edadesIguales = edadUsuarioo==edadCompaniero
console.log(`Mi edad es igual a la de mi compañero: ${edadesIguales}`)