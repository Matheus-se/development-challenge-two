const UpdatePatientController = require('./updatePatientController');
const UpdatePatientUseCase = require('./updatePatientUseCase');
const DynamoDbPatientRepository = require('../repositories/implementations/dynamoDbPatientRepository');

const dynamoDbPatientRepository = new DynamoDbPatientRepository();

const updatePatientUseCase = new UpdatePatientUseCase(dynamoDbPatientRepository);

module.exports = new UpdatePatientController(updatePatientUseCase);