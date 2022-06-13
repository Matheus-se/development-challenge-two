class DeletePatientUseCase {
    constructor(deletePatientRepository) {
        this.patientRepository = deletePatientRepository;
    }

    async execute(data) {
        const {id} = data;
        
        const patientAlreadyExists = await this.patientRepository.findPatient(id);

        if (!patientAlreadyExists || patientAlreadyExists.length === 0) {
            throw new Error("Patient doesn't exists.");
        }

        await this.patientRepository.delete(id);
    }
}

module.exports = DeletePatientUseCase;