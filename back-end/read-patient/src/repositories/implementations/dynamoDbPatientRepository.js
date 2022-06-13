const AWS = require('aws-sdk');

const dynamoPatient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1'});
const TABLE_NAME = "patients";

class DynamoDbPatientRepository {
    constructor() {}
    
    async findPatients(lastId=undefined, email=undefined, name=undefined) {
        let patients = {Items: [], Count: 0, ScannedCount: 0, LastEvaluatedKey: {id: ""}};
        let filterExpression = '';
        let expressionAttributeNames = undefined
        let expressionAttributeValues = {};
        
        let params = {
            TableName: TABLE_NAME,
            Limit: email != undefined || name != undefined ? 100 : 5,
        };
        
        console.log(lastId, email, name)
        
        if (lastId != undefined) {
            params["ExclusiveStartKey"] = {id: lastId};
        }
        if (email != undefined) {
            filterExpression += 'begins_with(email, :email)';
            expressionAttributeValues[":email"] = email.toLowerCase();
        }
        if (name != undefined) {
            filterExpression += `${filterExpression.length > 0 ? " or " : ""}begins_with(#name, :name)`;
            expressionAttributeNames = {"#name": "name"};
            expressionAttributeValues[":name"] = name.toLowerCase();
            params["ExpressionAttributeNames"] = expressionAttributeNames;
            console.log(filterExpression);
        }
        
        if (filterExpression.length > 0) {
            params["FilterExpression"] = filterExpression;
        }
        
        if (expressionAttributeValues[":name"] || expressionAttributeValues[":email"]) {
            params["ExpressionAttributeValues"] = expressionAttributeValues;
        }
        
        console.log("teste: ", params)
        
        await dynamoPatient.scan(params).promise().then(res => {
            patients = res;
        });

        return patients;
    }
}

module.exports = DynamoDbPatientRepository;