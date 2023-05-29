const {Service: ServiceModel} = require("../models/Service");

const serviceController = {

      create: async(req, res) => {
            try {
                  const service = {
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        image: req.body.image
                  };

                  const response = await ServiceModel.create(service);
                  
                  res.status(201).json({response, msg:"Service created successfully!"})

            } catch (error) {
                  console.log(`ERROR: ${error}`);
            }
      },
      
      getAll: async(req, res) => {
            try {
                  
                  const services = await ServiceModel.find()

                  res.json(services);

            } catch (error) {
                  console.log(`ERROR: ${error}`);
            }
      },

      get: async(req, res) => {
            try {
                  
                  const id = req.params.id;
                  const services = await ServiceModel.findById(id);

                  if (!services){
                        res.status(404).send({msg: "Service not found."});
                        return;
                  }

                  res.json(services);

            } catch (error) {
                  console.log(`Error: ${error}`);
            }
      },

      delete: async(req, res) => {
            try {
                  
                  const id = req.params.id;
                  const services = await ServiceModel.findById(id);
                  
                  if (!services){
                        res.status(404).send({msg: "Service not found."});
                        return;
                  }

                  const deleteService = await ServiceModel.findByIdAndDelete(id);

                  res.status(200).send({msg: "Service successfully deleted."});

            } catch (error) {
                  console.log(`Error: ${error}`);
            }
      },
      
      update: async(req, res) => {
            try {
                  
                  const id = req.params.id;
                  const service = {
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        image: req.body.image
                  };

                  const updatedService = await ServiceModel.findByIdAndUpdate(id, service);
                  
                  if (!updatedService){
                        res.status(404).send({msg: "Service not found."});
                        return;
                  }

                  res.status(200).json({service, msg: "Service sucessfully updated."});

            } catch (error) {
                  console.log(`Error: ${error}`);
            }
      }

};

 
module.exports = serviceController
// criar algo no banco --> 201
// td certo --> 200     