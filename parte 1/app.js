//Login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function(){
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result){
      console.log(result.user);
      guardarDatos(result.user);
      $('#login').hide;
      $('#root').append("<img src='"+result.user.photoURL+"' />")
    });
});

//guardar datos automaticamente
function guardarDatos(user){
  var usuario = {
    uid: user.uid,
    nombre : user.displayName,
    email : user.email,
    foto: user.photoURL
  }
  firebase.database().ref("usuarios/"+ user.uid)
  .set(usuario)
}

//Escribir una base de datos
$('#guardar').click(function(){
  firebase.database().ref("persona")
  .set({
    nombre: "benjamin",
    edad: "22"
  })
});

//Leer base de Datos
firebase.database().ref("usuarios")
.on("child_added", function(s){
  var user = s.val();
  $('#root').append("<p>"+user.nombre+"</p>")
  $('#root').append("<img width='100px' src='"+user.foto+"' />")

});
