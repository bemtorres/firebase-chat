var txtNombre = document.getElementById('nombre');
var txtMensaje = document.getElementById('mensaje');
var btnEnviar = document.getElementById('enviar');
var chat = document.getElementById('chat');
var error = document.getElementById('error');

btnEnviar.addEventListener("click", function() {
  var nombre = txtNombre.value;
  var mensaje = txtMensaje.value;
  if (nombre.length<1 || mensaje.length<1) {
    alert("Ingrese datos solicitados");
    error.innerHTML = "<p class='text-danger'>Ingrese datos</p>";
  }else{
    var html = "<tr><td><strong>"+nombre+"</strong></td><td>"+mensaje+"</td></tr>";
    chat.innerHTML += html;
    error.innerHTML = "";
    firebase.database().ref('chat')
    .push({
          name : nombre,
          message : mensaje
        });
  }
});

firebase.database().ref('chat')
  .on('value', function(s) {
    var html = '';
    s.forEach(function (e){
      var element = e.val();
      var nombre = element.name;
      var mensaje = element.message;
      html += "<tr><td><strong>"+nombre+"</strong></td><td>"+mensaje+"</td></tr>";
    });
    chat.innerHTML = html;
  });
