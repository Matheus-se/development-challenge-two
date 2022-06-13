const CreatePatientController = require('./createPatientController');
const CreatePatientUseCase = require('./createPatientUseCase');
const DynamoDbPatientRepository = require('../repositories/implementations/DynamoDbPatientRepository');

const dynamoDbPatientRepository = new DynamoDbPatientRepository();

const createPatientUseCase = new CreatePatientUseCase(dynamoDbPatientRepository);

module.exports = new CreatePatientController(createPatientUseCase);