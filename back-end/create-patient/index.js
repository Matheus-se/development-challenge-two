const createPatientController = require('./src/useCases/index.ts');

exports.handler = async (event, context) => {
    const response = await createPatientController.execute(event);
    return response;
};