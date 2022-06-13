const AWS = require('aws-sdk');

const dynamoPatient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1'});
const TABLE_NAME = "patients";

class DynamoDbPatientRepository {
    constructor() {}
    
    async findByEmail(email) {
        let patients = [];

        const params = {
            TableName: TABLE_NAME,
            IndexName: "email-index",
            ExpressionAttributeValues: {
                ":email": email
            },
            KeyConditionExpression: "email = :email",
            ScanIndexForward: false
        };
        await dynamoPatient.query(params).promise().then(res => {
            patients = res.Items;
        });

        return patients;
    }

    async save(patient) {
        const params = {
            TableName: TABLE_NAME,
            Item: {
                'id': patient.id,
                'email': patient.email,
                'name': patient.name,
                'address': patient.address,
                'birth': patient.birth.toISOString(),
                'createdAt': patient.createdAt.toISOString(),
            }
        }
        
        await dynamoPatient.put(params).promise();
    }
}

module.exports = DynamoDbPatientRepository;