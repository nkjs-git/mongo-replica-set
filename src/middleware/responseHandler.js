module.exports = (req, res, next) => {
  if (Object.keys(req.responseObject).length > 0) {
    const { code, success, ...rest } = req.responseObject

    if (success === true) {
      res.status(code).send({
        success,
        ...rest
      })
    } else {
      res.status(code).send({
        success,
        ...rest
      })
    }
  }
  next()
}
