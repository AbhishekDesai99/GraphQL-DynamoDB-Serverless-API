const createRes = (statusCode, body) => {
    return {
        statusCode,
        body: JSON.stringify(body),
      };
}

const createObject = (object) => {
    let myObject = new Object()
    const keys = Object.keys(object)
    keys.map(key => {
        myObject[key] = object[key]
    })
    return myObject
}

const queryBuilder = (queryModel, queryInputKey, queryInputValue, responseFields) => {
    let query = `{${queryModel}(${queryInputKey}: ${queryInputValue}){`
    responseFields.map(field => {
        query += ` ${field}`
    })
    query += '}}'
    return query
}

module.exports = {
    createRes,
    createObject,
    queryBuilder
}

// console.log(queryBuilder('user', 'id',  9, ['id', 'firstName']))