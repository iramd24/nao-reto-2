import capacityMessage from '../models/capacityMessage.js'

export const getCapacities = async (req, res)  => {
    try {
        const capacitiesCollection  = await capacityMessage.find();
        console.log(capacitiesCollection);

        res.status(200).json(capacitiesCollection);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const updateCapacities = async (req, res)  => {
    try {
        const  capacitiesCollection = await capacityMessage.find();
        const updateResult  = await capacityMessage.findOneAndUpdate(
            { _id: capacitiesCollection._id },
            { capacities: [] },
            { new: true, overwrite: true }
        );

        console.log(updateResult);
        res.status(200).json(updateResult);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};