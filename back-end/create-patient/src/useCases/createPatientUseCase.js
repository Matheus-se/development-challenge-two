const Patient = require('../entities/Patient');

class CreatePatientUseCase {
    constructor(createPatientRepository) {
        this.patientRepository = createPatientRepository;
    }

    async execute(data) {
        const {name, birth, address, email} = data;
        
        const patientAlreadyExists = await this.patientRepository.findByEmail(data.email);

        if (patientAlreadyExists && patientAlreadyExists.length > 0) {
            throw new Error("Patient already exists.");
        }

        const patient = new Patient(name, birth, address, email);

        await this.patientRepository.save(patient);

        return patient;
    }
}

module.exports = CreatePatientUseCase;