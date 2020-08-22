module.exports.iniciaChat = function(application, req, res){

    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    var erros = req.validationErrors();

    if(erros){
      res.render('index', {validacao : erros});
      return;
    }

    application.get('io').emit('msgForClient', {name: dadosForm.apelido,
                                                mensagem: ' entrou no chat'}
    );

    let x = 0;

    application.get('io').on('connection', function(socket){
      socket.emit('connect');
      socket.on('connected', function(data) {
          console.log(data.apelido_existente);
          x++;
          console.log(x);
        if(parseInt(data.apelido_existente)==0 ) {
          socket.emit('participantesParaCliente', {name: dadosForm.apelido});
          if (x==1) {
            socket.broadcast.emit('participantesParaCliente', {name: dadosForm.apelido});
          }

        }
      });
    });


    res.render('chat', {dadosForm: dadosForm});
}
