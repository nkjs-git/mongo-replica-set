const { MongoClient } = require('mongodb');
const config = require('./../config')
const { v4: uuidv4 } = require('uuid');

const {
    mongoURL
} = config


const getPatientData = async function () {


    const url = mongoURL
    console.log("Connecting to URL: ", url)
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {

        await client.connect()
        db = client.db('patient-db')
        var coll = await db.collection('patient-data');
        const documents = await coll.find({}).toArray();
        client.close();
        return { success: true, message: 'request served successfully', code: 200, documents }
    } catch (err) {
        const { code, message, stack, ...restError } = err
        console.log(err)
    }
}

const addPatientDetails = async (req, res) => {
    const { body: { name, age, ...rest } } = req
    const url = mongoURL;
    console.log("Connecting to URL: ", url)
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        if (!name || !age) {
            return { success: false, message: 'invalid data. Either name or age is empty', code: 404 }
        }

        const data = {
            _id: uuidv4(),
            name,
            age,
            ...rest
        }

        await client.connect()
        db = client.db('patient-db')
        var coll = await db.collection('patient-data');
        const result = await coll.insertOne(data)
        console.log(result);
        const insertedData = await coll.find({ _id: result.insertedId }).toArray()
        client.close();
        return { success: true, message: 'request served successfully', code: 200, data: insertedData }
    } catch (err) {
        const { code, message, stack, ...restError } = err
        console.log(err)
    }
}

const validateDocumentId = (uid) => {
    if (!uid) {
        throw new InvalidArgumentError('documentId')
    }

    return uid
}

const deletePatientDetails = async (id, res) => {
    console.log("id: ", id)
    const patientId = validateDocumentId(id)
    const url = mongoURL
    console.log("Connecting to URL: ", url)
    const client = new MongoClient(url, { useUnifiedTopology: true });
    console.log('got connection: ', patientId)
    try {
        await client.connect()
        db = client.db('patient-db')
        var coll = await db.collection('patient-data');
        await coll.deleteOne({ _id: patientId })
        client.close();
        console.log("deleted")
        return { success: true, message: `Deleted record successfully: ${patientId}`, code: 200 }
    } catch (err) {
        const { code, message, stack, ...restError } = err
        console.log(err)
    }
}

module.exports = {
    getPatientData,
    addPatientDetails,
    deletePatientDetails
}
