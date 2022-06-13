const DeletePatientController = require('./deletePatientController');
const DeletePatientUseCase = require('./deletePatientUseCase');
const DynamoDbPatientRepository = require('../repositories/implementations/dynamoDbPatientRepository');

const dynamoDbPatientRepository = new DynamoDbPatientRepository();

const deletePatientUseCase = new DeletePatientUseCase(dynamoDbPatientRepository);

module.exports = new DeletePatientController(deletePatientUseCase);