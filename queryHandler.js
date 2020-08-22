const schema = require('./schema').schema //my user schema from schema.js
const resolvers = require('./resolver').resolvers //my dynamodb data resolver
const myFuncs = require('./common_functions') //my Functions 
const { graphql } = require('graphql')

module.exports.handler = async event => {
  if(!event.queryStringParameters || !event.queryStringParameters.id) return myFuncs.createRes(400, { Error: 'id required!'})
  const responseFields = ['id', 'firstName', 'lastName', 'role', 'company']
  const query = myFuncs.queryBuilder('user', 'id', parseInt(event.queryStringParameters.id), responseFields)
  const result = await graphql(schema, query, resolvers)
  if(!result.data || !result.data.user || result.data.user.id === null) return myFuncs.createRes(200, {})
  return myFuncs.createRes(200, myFuncs.createObject(result.data.user))
}

