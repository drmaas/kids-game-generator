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
import { executePrompt } from '../llm/gemini';

const router = Router();

router.post(
  '/generate',
  async (req, res, next) => {
    safetyFilter(req, res, next);
  },
  async (req, res) => {
    try {
      const systemPrompt = `
    Create a children's educational game using the JavaScript Canvas API. Follow these technical specifications:

    1. Output only the raw JavaScript code without explanations
    2. Do not format in markdown or HTML
    3. The game should render to the dimensions of the canvas element: ${req.body.dimensions}    
    4. Use requestAnimationFrame for animation
    5. The game must be able to run in a web browser

    Follow these content guidelines:

    1. Ensure the game is rated PG
    2. Games MUST keep track of each player's turn, score, and notify players of the winner
    3. No violence or inappropriate content
    4. No personal information or data collection
    5. No external links or advertisements
    
    Follow these game design principles:

    1. Incorporate educational elements such as math puzzles, language skills, science facts, or problem-solving challenges, making learning fun and engaging.

    2. Use stunning, vibrant graphics with smooth animations, colorful environments, and charming characters to captivate young players' attention.

    3. Ensure the game is easy to play with simple controls suitable for touchscreens, keyboards, and controllers, making it accessible across all devices including mobile phones, tablets, and computers.

    4. Optimize the game for seamless play across all devices and screen sizes, ensuring responsive design, fast loading times, and smooth performance.`;

      const result = await executePrompt(systemPrompt, req.body.prompt);
      const code = result.response.text();

      // Simple summary extraction
      const summaryPrompt = `Provide a detailed explanation of this game. Include rules and objective. Do NOT include code explanations.`;
      const summaryResult = await executePrompt(code, summaryPrompt);
      const summary = summaryResult.response.text();

      res.json({ code, summary });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Game generation failed' });
    }
  }
);

export default router;
