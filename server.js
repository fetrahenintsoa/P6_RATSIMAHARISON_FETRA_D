//importer le package HTTP de node.js pour crée le serveur
const http = require('http');
const app = require ('./app');


//dire sur quel port on va utilisé
app.set ('port', process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
/*console.log('voila je suis la')*/