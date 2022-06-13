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
        await dynamoPatient.query(params).promise().then(res => {
            patients = res.Items;
        });

        return patients;
    }
    
    async findPatientByEmail(email) {
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

    async update(patient) {
        let updateValues = Object.getOwnPropertyNames(patient).filter(value => {return value !== "id"});
        let updateExpression = "set ";
        let expressionAtributeValues = {};
        
        if (updateValues.length === 0) {
            throw new Error("Couldn't find the attribute for update the patient.");
        }
        
        for (let i = 0; i < updateValues.length; i++) {
            updateExpression += `${updateValues[i] === "name" ? "#" : ""}${updateValues[i]} = :${updateValues[i]}${i !== updateValues.length - 1 ? ", " : ""}`
            expressionAtributeValues[`:${updateValues[i]}`] = patient[updateValues[i]];
        }
        
        
        let params = {
            TableName: TABLE_NAME,
            Key: {
                id: patient.id
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAtributeValues,
            ReturnValues: "ALL_NEW"
        }
        
        if (patient.name) {
            params["ExpressionAttributeNames"] = {
                "#name": "name"
            }
        }
        
        let updatedPatient = await dynamoPatient.update(params).promise();

        return updatedPatient;
    }
}

module.exports = DynamoDbPatientRepository;