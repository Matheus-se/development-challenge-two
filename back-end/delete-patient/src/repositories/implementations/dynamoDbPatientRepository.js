const AWS = require('aws-sdk');

const dynamoPatient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1'});
const TABLE_NAME = "patients";

class DynamoDbPatientRepository {
    constructor() {};
    
    async findPatient(id) {
        let patients = [];

        const params = {
            TableName: TABLE_NAME,
            ConsistentRead: true,
            ExpressionAttributeValues: {
                ":id": id
            },
            KeyConditionExpression: "id = :id",
        }
        await dynamoPatient.query(params, () => {}).promise().then(res => {
            patients = res.Items;
        });

        return patients;
    }

    async delete(id) {
        
        let params = {
            TableName: TABLE_NAME,
            Key: {
                id: id
            }
        }
        
        await dynamoPatient.delete(params).promise();
    }
}

module.exports = DynamoDbPatientRepository;