//
// middleware - объект с методами, которые срабатывает каждый раз, когда
// происходит запрос на сервер по всем адресам или только определенным. Используя
// эти функции можно проверять аутентификацию или вести дневник обращений к серверу (log-файл).
// Методы middleware всегда срабатывают перед выполнением основной функции.
//

var express = require('express');
var server = express();
const PORT = 3000;

var middleware = { // объект middleware
  requireAuthentification: function (request, response, next) { // метод requireAuthentification. Request - запрос, response - ответ, next -  функция, которая указывает на переход к выполнению основной функции, если ее не использовать сервер выполнит код метода и зависнет в ожидании
    console.log ('хуй');
    next();
  },
  logger: function (request, response, next) {
    console.log(request.method, request.originalUrl); // method - свойство содержащее метод запроса (GET, POST...), originalUrl - содержит относительный адрес запроса
    next();
  }
};

server.use(middleware.requireAuthentification); // такая запись означает, что метод requireAuthentification будет срабатывать при любом обращении к серверу. Порядок записи важен - функция должна вызываться до описания всех запросов к серверу (server.get и др.) или она сработает только на тех запросах, которые описаны после нее.

server.get('/about', middleware.logger, function (request, response) { // такая запись означает, что метод logger будет срабатывать только при переходе на страницу /about
  response.send('About page');
});

server.use(express.static(__dirname + '/public')); // все файлы из папки public будут доступны по адресу http://localhost:3000/название_файла.расширение_файла
// Если по основному пути не передаются данные, то в папку public можно поместить файл index.html, который автоматически откроется по основному пути http://localhost:3000
server.listen(PORT, function() { console.log('Server started on port ' + PORT); }); // запуск сервера на порте 3000 и вызов функции сразу после запуска
