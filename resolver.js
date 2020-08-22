const { DocumentClient } = require('aws-sdk/clients/dynamodb') //DynamoDB client from aws-sdk
const docClient = new DocumentClient({ region: 'ap-south-1', accessKeyId: 'AKIASBSJSB3P5CKZ3C77', secretAccessKey: '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'})

module.exports.resolvers = {
    user: async ({ id}) => {
        let data = await docClient.get({
            TableName: 'User',
            Key: {
                id: id
            }
        }).promise()
        if(!data.Item) return {}
        else return data.Item
    }
}
