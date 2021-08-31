const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let bolas = [
    {id: 1, nome: 'Dominate V', tipo: 'Basquete', marca: 'Nike'},
    {id: 2, nome: 'TF-1000', tipo: 'Basquete', marca: 'Spalding'},
    {id: 3, nome: 'All-court', tipo: 'Basquete', marca: 'Adidas'},
    {id: 4, nome: 'NCAA', tipo: 'Basquete', marca: 'Wilson'},
]

/**
 * Retorna todas bolas em JSON 
 */

app.get('/bolas', (request, response) => response.json(bolas))

/**
 * Buscar UM único recurso
 */
app.get('/bolas/:id', (request, response) => {
    const bola = bolas.filter(value => value.id == request.params.id);
    response.json(bola);
})
/**
 * Inserir dados no servidor
 */
app.post('/bolas', (request, response) => {
  const bola = request.body;
  bolas.push(bola);
  response.json(bola);
})

/**
 * Atualizar nome de bolas
 */
 app.put('/bolas/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let bola = bolas.filter(value => value.id == id);

    bola[0].nome = nome;

    response.json(bola[0]);
})

app.delete('/bolas/:id', (request, response) => {
    const id = request.params.id;
    bolas = bolas.filter(value => value.id != id);
    response.json(bolas);
})

app.listen(3000);