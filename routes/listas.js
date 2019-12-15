const express = require('express');
const router = express.Router();
const Lista = require("../store/Lista");
const Tarefa = require("../store/Tarefa");
const Usuario = require("../store/Usuario");

var data = {};

router.get('/:usuarioId', function (req, res) {
  Usuario.find({ id: req.params.usuarioId })
    .then(function (usuario) {
      Lista.find({ usuarioId: req.params.usuarioId })
        .then(function (lista) {
          res.render('listas', { lista: lista, usuario: usuario[0] });
        })
    })
});

router.post('/:usuarioId', function (req, res) {
  Lista.find().sort({ "_id": -1 }).limit(1)
    .then(function (lista) {
      data = {
        id: lista.length > 0 ? lista[0].id + 1 : 1,
        usuarioId: req.params.usuarioId,
        descricao: req.body.descricao
      }
      if (req.body.descricao == "") {
        res.render("listaMensagem", { lista: data, mensagem: `Informe a descrição da lista!` });
      }
      else {
        Lista.create(data).then(response => {
          res.render("listaMensagem", { lista: response, mensagem: `${response.descricao} - adicionada com sucesso!`});
        });
      }
    })
});

router.get("/lista/:id", function (req, res) {
  Lista.find({ id: req.params.id }).then(response => {
    res.render("lista", { lista: response[0] });
  });
})

router.post("/lista/:id", function (req, res) {
  Lista.update({ id: req.params.id }, { descricao: req.body.descricao }).then(function (response) {
    Lista.find({ id: req.params.id })
      .then(function (lista) {
        res.render('listaMensagem', { lista: lista[0], mensagem: `Lista modificada com sucesso!` });
      })
  });
})

router.post("/delete/:id", function (req, res) {
  Lista.find({ id: req.params.id })
    .then(function (lista) {
      Lista.deleteMany({ id: req.params.id }).then(
        res.render("listaMensagem", { lista: lista[0], mensagem: `Lista ${lista[0].descricao} - deletada com sucesso!` }));
    })
})


module.exports = router;
