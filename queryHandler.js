const schema = require('./schema').schema //my user schema from schema.js
const resolvers = require('./resolver').resolvers //my dynamodb data resolver
const myFuncs = require('./common_functions') //my Functions 
const { graphql } = require('graphql')
const responseFields = ['id', 'firstName', 'lastName', 'role', 'company']

module.exports.handler = async event => {
  let query
  console.log(JSON.stringify(event))  
  if(!event.queryStringParameters) {
    query = myFuncs.queryBuilder('users', responseFields)
  } else {
    query = myFuncs.queryBuilder('user', responseFields, { 'id': parseInt(event.queryStringParameters.id) })
  }
  
  const result = await graphql(schema, query, resolvers)
  
  if(result.data && result.data.user) {
    if(result.data.user.id === null) return myFuncs.createRes(200, {})
    return myFuncs.createRes(200, result.data.user)
  } else {
    return myFuncs.createRes(200, result.data.users)
  }
}

