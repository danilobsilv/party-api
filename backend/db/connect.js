const mongoose = require("mongoose");

async function main(){

      try {
            
            mongoose.set("strictQuery", true);

            await mongoose.connect("mongodb+srv://danilobsilv:saJD6huXM2OhCkx4@cluster0.xhrh07u.mongodb.net/?retryWrites=true&w=majority");
      
      console.log("Connected to the database!")

      } catch (error) {
            console.log(`ERROR: ${error.message}`);
      }

}


module.exports = main