const { HelloController, PatientDetails } = require('../controllers')

const { asyncwrap } = require('../middleware')

const hello = function ({ router }) {
  router.get('/', asyncwrap(HelloController.get))
  return router
}

const patients = function ({ router }) {
  router.get('/', asyncwrap(PatientDetails.getAll))
  router.post('/', asyncwrap(PatientDetails.add))
  router.delete('/:patientId', asyncwrap(PatientDetails.deleteOne))
  return router
}

module.exports = {
  hello,
  patients
}
