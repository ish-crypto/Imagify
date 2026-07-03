import axios from "axios";
import userModel from "../models/userModels.js";
import FormData from "form-data";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.body.userId; // from auth middleware

    if (!prompt) {
      return res.json({ success: false, message: 'Prompt is required' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: 'Insufficient Credits', creditBalance: user.creditBalance });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
        ...formData.getHeaders()
      },
      responseType: 'arraybuffer'
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;
 await userModel.findByIdAndUpdate(userId,{creditBalance:user.creditBalance-1})
    // return the generated image
    return res.json({ success: true,message:'image generated successfully',image: resultImage, creditBalance: user.creditBalance - 1 });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error instanceof Error ? error.message : String(error) });
  }
};
