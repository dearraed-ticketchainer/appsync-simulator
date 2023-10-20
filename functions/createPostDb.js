const Dynamo = require('./../common/Dynamo');
const Responses = require('./../common/API_Responses');

const tableName = process.env.tableName;

exports.handler = async (event) => {
    // TODO implement
    console.log("event create post db : ", event);
    console.log("tableName : ", tableName);
    const { ID, title, public } = event.arguments
    const data = { ID, title, public }
    const newPost = await Dynamo.write(data, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });
    console.log("new Post : ", newPost);
    if(!newPost){
        return Responses._400({ message: 'Failed to write post by ID' });
    }
    return data;
}
  