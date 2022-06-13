class CreatePatientController {
    constructor(createPatientUseCase) {
      this.createPatientUseCase = createPatientUseCase;
    }
  
    async execute(request) {
      const response = { 
          statusCode: 201,
          headers: {
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Credentials" : true
          },
      };
      const body = JSON.parse(request.body);
      
      const {name, email, birth, address} = body;
  
      try {
        const newPatient = await this.createPatientUseCase.execute({
          name,
          email,
          birth,
          address,
        });
  
        response.body = JSON.stringify(newPatient);
  
        return response;
      } catch (err) {
        response.statusCode = 400;
        response.body = JSON.stringify({
          error: err.message || "Unexpected error while registering patient.",
        });
  
        return response;
      }
    }
  }
  
  module.exports = CreatePatientController;