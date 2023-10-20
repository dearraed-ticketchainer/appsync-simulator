// @ts-nocheck
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require ("@aws-sdk/lib-dynamodb");

let options = {};
console.log("offline env : ", process.env.IS_OFFLINE)
// if(process.env.IS_OFFLINE){
//     options = { 
//         region: 'localhost',
//         endpoint: 'http://localhost:8000',
//         credentials: {
//           accessKeyId: 'MockAccessKeyId',
//           secretAccessKey: 'MockSecretAccessKey'
//         }
//     }
// }




const client = new DynamoDBClient(options);
const docClient = DynamoDBDocumentClient.from(client);

const Dynamo = {
    async get(ID, TableName) {
        const command = new GetCommand({
            TableName,
            Key: {
                ID
            }
        });

        const data = await docClient.send(command);

        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }

        console.log("data : ", data)

        return data.Item;
   },

   async write (data, TableName) {
    console.log("TableName: ", TableName);
        if(!data.ID){
            throw Error('No ID on the data')
        }

        const command = new PutCommand({
            TableName: TableName,
            Item: data
          });

        const res = await docClient.send(command);
        // @ts-ignore
        if(res.error) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`)
        }

        console.log("res : ", res)

        return data;
   }
}

module.exports = Dynamo;