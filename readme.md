# GraphQL-DynamoDB-Serverless-API

This is the example of using Serverless Lambda function, DynamoDB and GraphQL together. 

# Instructions

clone the repo,
install node modules, with 
" npm i",

You will need an AWS Account, login to your account go to DynamoDB console,
create the Table named "User" with the partition key name equal to id and type equal to number, make sure you give the same name, in future updates I will add dynamodb creation using cloudformation so it will remove remove naming refrence issues.

you will need to note down the region and table name, because that you need to provide in serverless.yml file before deploying.

add the region to the provider section of your serverless.yml, ex.
provider:
  name: aws
  runtime: nodejs10.x
  region: ap-south-1
  memorySize: 128
  
add the table name and region to the environment of the "queryHandler" function, ex.
queryHandler:
    handler: queryHandler.handler
    role: !GetAtt lambdaServiceRole.Arn
    events:
      - http:
          path: /user
          method: get
    environment:
      TableName: User
      region: !Ref AWS::Region

Create item inside your DynamoDb 'User' table, ex.
{
    "id": 123,
    "firstName": "Mathew",
    "lastName": "Clerk",
    "role": "devOps",
    "company": "craftsSolutions"
}


deploy the stack using
sls deploy

grab the api gateway url from the deployment output, and that's it! pretty simple.
you can check it by 
curl "your API gateway endpoint url"/id=someValue