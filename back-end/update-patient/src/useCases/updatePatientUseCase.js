const Patient = require('../entities/Patient');

class UpdatePatientUseCase {
    constructor(updatePatientRepository) {
        this.patientRepository = updatePatientRepository;
    }

    async execute(data) {
        const {name, birth, address, email, id} = data;
        
        let patientAlreadyExists = await this.patientRepository.findPatient(data.id);

        if (!patientAlreadyExists || patientAlreadyExists.length === 0) {
            throw new Error("Patient doesn't exists.");
        }

        const patient = new Patient(name, birth, address, email, id);
        
        if (patient.email) {
            patientAlreadyExists = await this.patientRepository.findPatientByEmail(patient.email);
            
            if (patientAlreadyExists && patientAlreadyExists.length > 0) {
                throw new Error("E-mail already beeing used.");
            }
        }

        const updatedPatient = await this.patientRepository.update(patient);

        return updatedPatient;
    }
}

module.exports = UpdatePatientUseCase;