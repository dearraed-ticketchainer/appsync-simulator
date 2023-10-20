const Dynamo = require('./../common/Dynamo')
 
const tableName = process.env.tableName;

exports.handler = async (event) => {
    // TODO implement
    console.log("event get post db : ", event);
    console.log("tableName : ", tableName);
    const ID = event.arguments.ID;
    const post = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });
    console.log("post : ", post);
    if(!post){
        return null;
    }

    return post;

}
  