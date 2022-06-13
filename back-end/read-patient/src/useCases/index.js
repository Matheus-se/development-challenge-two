const ReedPatientController = require('./reedPatientController');
const ReedPatientUseCase = require('./reedPatientUseCase');
const DynamoDbPatientRepository = require('../repositories/implementations/dynamoDbPatientRepository');

const dynamoDbPatientRepository = new DynamoDbPatientRepository();

const reedPatientUseCase = new ReedPatientUseCase(dynamoDbPatientRepository);

module.exports = new ReedPatientController(reedPatientUseCase);