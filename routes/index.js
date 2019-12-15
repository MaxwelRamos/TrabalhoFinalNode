
const express = require('express');
const router = express.Router();
const Usuario = require("../store/Usuario");
var data = {};

router.get('/', function (_, res) {
  res.render('usuario');
});

router.get('/registrar', function (_, res) {
  res.render('usuarioRegistro');
});

router.post('/registrar', function (req, res) {
  Usuario.find({ login: req.body.login })
    .then(function (login) {
      if (req.body.login == "" || req.body.senha == "" || req.body.confirmarsenha == "") {
        res.render("usuarioMensagem", { mensagem: `Informe usuário, senha e confirmação da senha para se cadastrar!` });
      }
      else if (req.body.senha != req.body.confirmarsenha) {
        res.render("usuarioMensagem", { mensagem: `Senha informada difere da confirmação da senha!` });
      }
      else if (login.length == 0) {
        Usuario.find().sort({ "_id": -1 }).limit(1)
          .then(function (usuario) {
            data = {
              id: usuario.length > 0 ? usuario[0].id + 1 : 1,
              login: req.body.login,
              senha: req.body.senha
            }
            Usuario.create(data).then(usuario => {
              res.render("usuarioSuccess", { usuario: usuario, mensagem: `Usuário ${usuario.login} cadastrado com sucesso!` });
            });
          })
      }
      else {
        res.render("usuarioMensagem", { mensagem: `Usuário existente, tente outro usuário!` });
      }
    })
});

router.post("/", function (req, res) {
  Usuario.find({ login: req.body.login })
    .then(function (usuario) {
      if (req.body.login == "" || req.body.senha == "") {
        res.render("usuarioMensagem", { mensagem: `Informe usuário e senha para logar!` });
      }
      else if (usuario.length == 0 || (usuario[0].senha != req.body.senha)) {
        res.render("usuarioMensagem", { mensagem: `Usuário ou senha não confere!` });
      }
      else {
        res.render("usuarioSuccess", { usuario: usuario[0], mensagem: `Usuário ${usuario[0].login} logado com sucesso!` });
      }
    })
});

module.exports = router;
