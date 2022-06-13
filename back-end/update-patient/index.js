const updatePatientController = require('./src/useCases/index');

exports.handler = async (event, context) => {
    const response = await updatePatientController.execute(event);
    return response;
};