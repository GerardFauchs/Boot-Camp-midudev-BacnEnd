const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('---------')
  next() // Seguir con el codigo
}

module.exports = logger
