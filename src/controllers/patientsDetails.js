const { GetPatientData } = require('../services')

async function getAll(req, res) {
  const data = await GetPatientData.getPatientData()
  req.responseObject = data
  console.log('data: ', data)
}

async function add(req, res) {
  const data = await GetPatientData.addPatientDetails(req, res)
  req.responseObject = data
  console.log('data: ', data)
}

async function deleteOne(req, res) {
  const { user, params = {} } = req
  const { patientId } = params
  const data = await GetPatientData.deletePatientDetails(patientId, res)
  req.responseObject = data
  console.log('data: ', data)
}

module.exports = {
  getAll,
  add,
  deleteOne
}
