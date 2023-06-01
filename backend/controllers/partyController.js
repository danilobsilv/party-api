const { deleteModel } = require("mongoose");
const PartyModel = require("../models/Party");
const mongoose = require("mongoose");

const checkPartyBudget = (budget, services) => {
      
      const priceSum = services.reduce((sum, service) => sum + service.price, 0);
      
      console.log(`my budget is ${budget} and the sum is ${priceSum}`);  // to debug
      return priceSum > budget;
}

const partyController = {

      create: async(req, res) => {
            try {
                  const party = {
                        title: req.body.title,
                        author: req.body.author,
                        description: req.body.description,
                        budget: req.body.budget,
                        image: req.body.image,
                        services: req.body.services
                  }

                  if (party.services && checkPartyBudget(party.budget, party.services) ){
                        res.status(406).json({msg: "Your budget is not enough."});
                        return;
                  }

                  const response = await PartyModel.create(party);
                  res.status(201).json({ response ,msg: "Your party was sucessfully created."});

            } catch (error) {
                  console.log(`Error: ${error}`);
            }
      },

      getAll: async(req, res) => {
            try {
                  
                  const parties = await PartyModel.find();

                  if (!parties){
                        res.status(404).send({msg: "There are no parties."});
                        return;
                  }

                  res.json(parties);

            } catch (error) {
                  console.log(`Error: ${error}`);
            }
      },

      get: async(req, res) => {
            try {
                  
                  const id = req.params.id;

                  if (!mongoose.Types.ObjectId.isValid(id)) {
                        res.status(400).send({ msg: "Invalid party ID." });
                        return;
                  }

                  const party = await PartyModel.findById(id);

                  if (!party){
                        res.status(404).send({msg: "Party not found."});
                        return;
                  }
                  res.json(party);

            } catch (error) {
                  console.log(`Error: ${error}`);
            }
      },

      delete: async(req, res) => {
            try {
                  
                  const id = req.params.id;

                  if (!mongoose.Types.ObjectId.isValid(id)) {
                        res.status(400).send({ msg: "Invalid party ID." });
                        return;
                  }

                  const party = await PartyModel.findById(id);

                  if (!party){
                        res.status(404).send({msg: "Party not found."});
                        return;
                  }

                  const deletedParty = await PartyModel.findByIdAndDelete(id);

                  res.status(200).send(deletedParty, {msg: "Party successfully deleted."});


            } catch (error) {
                  console.log(`Error: ${error}`);
            }
      },
      
      update: async(req, res) => {
            try {
                  const id = req.params.id;

                  if (!mongoose.Types.ObjectId.isValid(id)) {
                        res.status(400).send({ msg: "Invalid party ID." });
                        return;
                  }

                  const party = {
                        title: req.body.title,
                        author: req.body.author,
                        description: req.body.description,
                        budget: req.body.budget,
                        image: req.body.image,
                        services: req.body.services
                  }


                  const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

                  if (!updatedParty){
                        res.status(404).send({msg: "Party not found."});

                  res.status(200).json(updatedParty, {msg: "Party has been successfully updated."});
            }      
            } catch (error) {
                  console.log(`Error: ${error}`);
            } 
      }
}



module.exports = partyController;

