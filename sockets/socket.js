const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
  console.log('Cliente conectado');

  // Check if client has JWT via 'x-token' header
  const [isValid, uid] = checkJWT(client.handshake.headers["x-token"]);
  if (!isValid) {
    return client.disconnect();
  }

  // Client connected
  userConnected(uid);


  client.on('disconnect', () => {
    console.log('Cliente desconectado');
    userDisconnected(uid);
  });

  client.on('mensaje', (payload) => {
    console.log('Mensaje', payload);

    io.emit('mensaje', { admin: 'Nuevo mensaje' });

  });


});
