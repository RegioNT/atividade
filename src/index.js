const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let bolas = [
    {id: 1, nome: 'Dominate V', tipo: 'Basquete', marca: 'Nike'},
    {id: 2, nome: 'TF-1000', tipo: 'Basquete', marca: 'Spalding'},
    {id: 3, nome: 'All-court', tipo: 'Basquete', marca: 'Adidas'},
    {id: 4, nome: 'NCAA', tipo: 'Basquete', marca: 'Wilson'},
]
function log(request, response, next){
    const{url, method} = request;
    console.log(`${method} - ${url} at ${new Date()}`)
    return next();
}
app.use(log)

/**
 * Retorna todas bolas em JSON 
 */
app.get('/bolas', (request, response) => response.status(200).json(bolas))

/**
 * Buscar UM único recurso
 */
app.get('/bolas/:id', (request, response) => {
    const {id} = request.params;
    const bola = bolas.find(value => value.id == id);
    if(bola == undefined) {
        response.status(400).send({error: 'Requisição invalida'});
    }else{
        response.status(200).json(bola);
    }
})
/**
 * Inserir dados no servidor
 */
app.post('/bolas', (request, response) => {
    const bola = request.body;
    bolas.push(bola);
    response.status(201).json(bola);
})

/**
 * Atualizar nome de bolas
 */
 app.put('/bolas/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let bola = bolas.find(value => value.id == id);
    if(bola == undefined){
        response.status(400).send();
    }else{
        bola.nome = nome;
        response.status(200).json(bola);
    }
})

app.delete('/bolas/:id', (request, response) => {
    const {id} = request.params;
    const index = bolas.findIndex(value => value.id == id);
    if(index == -1){
        response.status(400).send();
    }else{
        bolas.splice(index, 1);
        response.status(204).send();
    }

})

app.listen(3000);