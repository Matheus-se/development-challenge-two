const deletePatientController = require('./src/useCases/index');

exports.handler = async (event, context) => {
    const response = await deletePatientController.execute(event);
    return response;
};