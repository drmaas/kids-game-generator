// Kids Game Generator
// Copyright (C) 2025 Daniel Maas
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
    3. Include a scoring/feedback system. Text should be easy to read and appear outside of the game board
    4. Use requestAnimationFrame for animation
    5. Output only the raw JavaScript code without explanations
    6. Do not format in markdown or HTML
    7. Do not reference images or assets. Use only the Canvas API to create graphics.
    8. The game should render to the dimensions of the canvas element: ${req.body.dimensions}
    9. The game should be interactive and engaging
    10. The game should be educational and teach a concept
    11. The game should be fun and enjoyable
    12. The game should be easy to understand and play
    13. The game should be visually appealing
    14. The game should be responsive and work on all devices
    15. The game should be unique and creative
    
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
