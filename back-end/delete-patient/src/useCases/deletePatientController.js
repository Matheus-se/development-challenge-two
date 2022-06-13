class DeletePatientController {
  constructor(deletePatientUseCase) {
    this.deletePatientUseCase = deletePatientUseCase;
  }

  async execute(request) {
    const response = { 
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true
        },
    };
    const body = JSON.parse(request.body);
    
    const {id} = body;

    try {
      await this.deletePatientUseCase.execute({
        id
      });

      response.body = JSON.stringify({message: "Patient deleted."});

      return response;
    } catch (err) {
      response.statusCode = 400;
      response.body = JSON.stringify({
        error: err.message || "Unexpected error while deleting patient.",
      });

      return response;
    }
  }
}

module.exports = DeletePatientController;