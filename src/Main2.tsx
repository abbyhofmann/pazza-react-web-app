import { MongoClient } from "mongodb";

async function main(){
   
    const uri = "mongodb+srv://kmwink21:<Volleyballgirl#5>@cluster0.epbe3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


function listDatabases(client: MongoClient) {
    throw new Error("Function not implemented.");
}
