const reedPatientController = require("./src/useCases/index");

exports.handler = async (event, context) => {
  const response = await reedPatientController.execute(
    event.queryStringParameters
  );
  return response;
};
