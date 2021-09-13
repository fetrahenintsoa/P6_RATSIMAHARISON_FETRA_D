//importation de express
const express = require('express');
//creation de l'app express

const sauce =require('./models/Sauce');
//importation de mongoose
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://new-limited02:b7zVl6rxRuu0Oud3@cluster0.mhxgn.mongodb.net/projet-6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//app.use
app.use((req,res,next) => {
    console.log('requete recue!');
    next();
});

//enregistrement des sauces dans la base de données

app.post('/api/sauces' ,(req,res,next)=> {
   //enlement du champ du corps de la requète avant de copier l'objet 
  delete req.body._id;

    const sauce =new sauce({
      //passé toute info quand a besoin
      ...req.body
    });
    //enredgistrement du donnée ds la base
    sauce.save()
    .then(()=> res.status(201).json({message:'objet enregistré!'}))
    .catch(error => res.status(400).json({error}));
    
});

app.get('/api/sauce/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
//implementation de la route get pour renvoyer tous les sauces dans la base de données

app.use('/api/sauce', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});
app.use((req, res,next) => {
    res.json({message :'votre requete a bien été recue!' });
    next();
});
app.use((req ,res) => {
    console.log('réponse envoyée avec succès');
});

//exportation de app.js pour pouvoir y acceder depuis une autre fichier
module.exports = app;

