import { Request, Response, NextFunction } from 'express';
import { model } from '../llm/gemini';

export default async function safetyFilter(req: Request, res: Response, next: NextFunction) {
  try {
    const { prompt } = req.body;
    
    const safetyCheck = await model.generateContent(`
      Analyze this prompt for children's game creation suitability. 
      Block if contains any of: violence, explicit content, adult themes.
      Prompt: ${prompt}
      Response format: "safe" or "unsafe"
    `);

    const result = safetyCheck.response.text();
    
    if (result.trim().toLowerCase() === 'unsafe') {
      return res.status(400).json({ error: 'Prompt violates content guidelines' });
    }
    
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Safety check failed' });
  }
}