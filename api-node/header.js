const handler = async () => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': 'http://localhost:3000/departamentos',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    body: JSON.stringify('Hello from Lambda!'),
  }
  return response
}

export default handler