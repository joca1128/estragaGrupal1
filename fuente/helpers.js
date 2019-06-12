const hbs = require("hbs");
const fs = require("fs");
listaCursos=[];

function guardar(){
    let datos=JSON.stringify(listaCursos);
    fs.writeFile("publico/listado.json",datos,(err)=>{
        if (err) throw (err);
        console.log("Archivo creado con exito!!!!");
    })
}


function listar(){
    try{
        console.log(__dirname);
        listaCursos=require("../publico/listado.json");
        console.log("Se abrió la lista");
    }
    catch{
        listaCursos=[];
        console.log("No Se abrió la lista");
    }
};


hbs.registerHelper("guardar",(nombre,id,descripcion,valor,modalidad,intensidad_horaria)=>{
    let curso={
        nombre,
        id,
        descripcion,
        valor,
        modalidad,
        intensidad_horaria,
        estado:"Disponible"
    };
    listar();
    let duplicado = listaCursos.find(cur => cur.id===id);
    if(!duplicado){
        listaCursos.push(curso);
        console.log(listaCursos);
        guardar();
        return "<p>Curso inscrito con exito!!</p>";
    }
    else{
        return "<p>Ya existe un curso con ese id</p>";
     }
})

hbs.registerHelper("mostrarCursos",()=>{
    listar();
    let texto = "<table align=center border=1px solid black> \
                <thead> \
                <th> Nombre </th> \
                <th> Descripcion </th> \
                <th> Valor </th> \
                <th> Estado </th> \
                <thead>\
                <tbody>";
    listaCursos.forEach(element => {
        texto= texto +
                "<tr>"+
                "<td>" +element.nombre+"</td>"+
                "<td>"+element.descripcion+"</td>"+
                "<td>"+element.valor+"</td>"+
                "<td>"+element.estado+"</td>"+
                "<td><button id="+String(element.id+100)+" onclick=funcion("+element.id+") >Ver Información Completa</button></td></tr>"
    });
    texto=texto+"</tbody></table>";
    listaCursos.forEach(element => {
        texto= texto +
                "<div id="+String(element.id)+ " style=display:none>\
                <table border=1px solid black > \
                <thead> \
                <th> Nombre </th> \
                <th> id </th> \
                <th> Descripcion </th> \
                <th> Valor </th> \
                <th> Modalidad </th> \
                <th> Intensidad Horaria en horas </th> \
                <th> Estado </th> \
                <thead>\
                <tbody >"+
                "<tr>"+
                "<td>" +element.nombre+"</td>"+
                "<td>" +element.id+"</td>"+
                "<td>"+element.descripcion+"</td>"+
                "<td>"+element.valor+"</td>"+
                "<td>" +element.modalidad+"</td>"+
                "<td>" +element.intensidad_horaria+"</td>"+
                "<td>"+element.estado+"</td>"+
                "<td></td></tr></tbody></table></div>"
    });
    return texto;
});