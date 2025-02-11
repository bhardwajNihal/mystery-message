import mongoose from "mongoose";

// Mongoose’s connection.readyState can have the following values:
    // 0 - Disconnected
    // 1 - Connected
    // 2 - Connecting
    // 3 - Disconnecting
    // 4 - Invalid Credentials (rare case)

interface connectionObject{
    isConnected? : number            // thus its type is defined as number
}

const connection:connectionObject = {}

async function connectToDB() {
    
    if(connection.isConnected){             // checks if already connected
        console.log("Already connected to database!");
        return;
    }
    
    try {
        const dbInstance = await mongoose.connect(process.env.DB_URL || "")
        console.log("Connected to Database successfully!");
        connection.isConnected = dbInstance.connections[0].readyState       // sets the connection object

    } catch (error) {
        console.log("Failed connecting to Database",error);
        process.exit(1);
    }
}

export default connectToDB;
