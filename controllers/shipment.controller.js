import Joi from "joi";
import Shipment from "../models/shipment.model.js";

export const createShipment = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    origin: Joi.string().required().messages({
      "any.required": "Origin is required",
      "string.empty": "Origin cannot be empty",
    }),
    destination: Joi.string().required().messages({
      "any.required": "Destination is required",
      "string.empty": "Destination cannot be empty",
    }),
    weight: Joi.number().optional(),
    description: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    console.log(req.user);

    const createValues = {
      name: req.body.name,
      origin: req.body.origin,
      destination: req.body.destination,
      weight: req.body.weight,
      description: req.body.description,
    }
    req.user.role == 'shipper' ? createValues.shipper = req.user._id : createValues.carrier = req.user._id
    console.log(createValues);
    const shipment = await Shipment.create(createValues);
    res.status(201).json({ success: true, message: "Shipment created successfully", data: shipment });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ [req.user.role]: req.user._id }).populate("shipper", "name").populate("carrier", "name");
    res.status(200).json({ success: true, message: "Shipments fetched successfully", data: shipments });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
