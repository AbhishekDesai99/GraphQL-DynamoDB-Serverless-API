const { DocumentClient } = require('aws-sdk/clients/dynamodb') //DynamoDB client from aws-sdk
const docClient = new DocumentClient()

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
    },
    users: async () => {
        let data = await docClient.scan({
            TableName: 'User',
        }).promise()
        return data.Items
    }
}

