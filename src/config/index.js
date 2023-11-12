const {
  MONGODB_SERVER = "localhost",
  MONGODB_ADMINUSERNAME = "",
  MONGODB_ADMINPASSWORD = "",
  MONGODB_DATABASE
} = process.env

const config = {
  MONGODB_DATABASE,
  mongoURL: `mongodb://${MONGODB_ADMINUSERNAME}:${MONGODB_ADMINPASSWORD}@${MONGODB_SERVER}:27017/`
}

module.exports = config
