import { Router } from 'express';
import safetyFilter from '../middleware/safetyFilter';
import { model } from '../llm/gemini';

const router = Router();

router.post(
  '/generate',
  async (req, res, next) => {
    safetyFilter(req, res, next);
  },
  async (req, res) => {
    try {
      const prompt = `
    Create a children's educational game using JavaScript Canvas API. Follow these rules:
    1. Suitable for ages 5-12
    2. No violence or inappropriate content
    3. Include scoring/feedback system
    4. Use requestAnimationFrame for animation
    5. Output only the raw JavaScript code without explanations
    6. Do not format in markdown or HTML
    7. Do not reference images or assets. Use only Canvas API to create graphics.
    
    Request: ${req.body.prompt}
    `;

      const result = await model.generateContent(prompt);
      const code = result.response.text();

      // Simple summary extraction
      const summaryPrompt = `Provide a detailed explanation of this game. Include rules and objective. Do NOT include code explanations: ${code}`;
      const summaryResult = await model.generateContent(summaryPrompt);
      const summary = summaryResult.response.text();

      res.json({ code, summary });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Game generation failed' });
    }
  }
);

export default router;
