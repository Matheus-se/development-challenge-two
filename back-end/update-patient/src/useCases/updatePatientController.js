class UpdatePatientController {
  constructor(updatePatientUseCase) {
    this.updatePatientUseCase = updatePatientUseCase;
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
    
    const {name, email, birth, address, id} = body;

    try {
      const newPatient = await this.updatePatientUseCase.execute({
        name,
        email,
        birth,
        address,
        id
      });

      response.body = JSON.stringify(newPatient);

      return response;
    } catch (err) {
      response.statusCode = 400;
      response.body = JSON.stringify({
        error: err.message || "Unexpected error while updating patient.",
      });

      return response;
    }
  }
}

module.exports = UpdatePatientController;