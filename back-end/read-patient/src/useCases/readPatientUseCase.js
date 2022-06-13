class ReedPatientUseCase {
    constructor(reedPatientRepository) {
        this.patientRepository = reedPatientRepository;
    }

    async execute(lastId=undefined, email=undefined, name=undefined) {
        
        const patients = await this.patientRepository.findPatients(lastId, email, name);

        return patients;
    }
}

module.exports = ReedPatientUseCase;