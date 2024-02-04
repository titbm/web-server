var middleware = { // объект middleware
  logger: function (request, response, next) {
    console.log('Request: ' + new Date().toString() + ' ' + request.method + ' ' + request.originalUrl); // method - свойство содержащее метод запроса (GET, POST...), originalUrl - содержит относительный адрес запроса
    next(); // next();
  }
};

module.exports = middleware;
