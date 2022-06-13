class ReedPatientController {
  constructor(reedPatientUseCase) {
    this.reedPatientUseCase = reedPatientUseCase;
  }

  async execute(search = undefined) {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    // const body = JSON.parse(request.body);

    // const {name, email, birth, address} = body;

    try {
      const lastId = search?.lastId || undefined;
      const email = search?.email || undefined;
      const name = search?.name || undefined;

      const patients = await this.reedPatientUseCase.execute(
        lastId,
        email,
        name
      );

      response.body = JSON.stringify(patients);

      return response;
    } catch (err) {
      response.statusCode = 400;
      response.body = JSON.stringify({
        error: err.message || "Unexpected error while fetching patients.",
      });

      return response;
    }
  }
}

module.exports = ReedPatientController;
