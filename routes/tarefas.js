
const express = require('express');
const router = express.Router();
const Tarefa = require("../store/Tarefa");
const Lista = require("../store/Lista");

router.get("/:id", function (req, res) {
  Lista.find({ id: req.params.id }).then(response => {
    Tarefa.find({ listaid: req.params.id }).then(tarefas => {
      res.render("tarefas", {
        lista: response[0],
        tarefas: tarefas
      });
    });
  });
});


router.post("/:id", function (req, res) {
  Lista.find({ id: req.params.id }).then(response => {
    Tarefa.find().sort({ "_id": -1 }).limit(1)
      .then(function (tarefa) {
        data = {
          id: tarefa.length > 0 ? tarefa[0].id + 1 : 1,
          listaid: req.params.id,
          descricao: req.body.descricao,
          usuarioId: response[0].usuarioId
        }
        if (req.body.descricao == "") {
          res.render("tarefaMensagem", { tarefa: data, mensagem: `Informe a descrição da tarefa!` });
        }
        else {
          Tarefa.create(data).then(response => {
            res.render("tarefaMensagem", { tarefa: response, mensagem: `${response.descricao} - adicionada com sucesso!` });
          });
        }
      })
  })
});

router.post("/tarefa/:id/:listaId", function (req, res) {
  Tarefa.update({ id: req.params.id }, { descricao: req.body.descricao }).then(response => {
    res.render("tarefaModifySuccess", { listaId: req.params.listaId, mensagem: `Tarefa modificada com sucesso!` });
  });
})

router.post("/delete/:id", function (req, res) {
  Tarefa.find({ id: req.params.id }).then(tarefa => {
    Tarefa.deleteMany({ id: req.params.id }).then(response => {
      res.render("tarefaMensagem", { tarefa: tarefa[0], mensagem: `Tarefa ${tarefa[0].descricao} - deletada com sucesso!` });
    });
  });
})

router.post("/concluir/:id", function (req, res) {
  Tarefa.find({ id: req.params.id }).then(tarefa => {
    if (tarefa[0].status == "pendente") {
      Tarefa.update({ id: req.params.id },{ status: 'concluída' }).then(response => {
        res.render("tarefaMensagem", { tarefa: tarefa[0], mensagem: `Tarefa ${tarefa[0].descricao} - concluída com sucesso!` });
      });
    }
    else {
      Tarefa.update({ id: req.params.id },{ status: 'pendente' }).then(response => {
        res.render("tarefaMensagem", { tarefa: tarefa[0], mensagem: `Tarefa ${tarefa[0].descricao} - reabilitada com sucesso!` });
      });
    }
  });
})

router.get("/tarefa/:id", function (req, res) {
  Tarefa.find({ id: req.params.id }).then(response => {
    res.render("tarefa", { tarefa: response[0] });
  });
})

module.exports = router;
