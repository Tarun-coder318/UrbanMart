import Address from "../Model/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    
    console.log("📥 Received address:", address);
    console.log("👤 Received userId:", userId);  // <== Check this in terminal

    await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId  = req.userId;
    const address = await Address.find({ userId });
    res.json({ success: true, address });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
