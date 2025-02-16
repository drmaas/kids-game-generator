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
import { Request, Response, NextFunction } from 'express';
import { executePrompt } from '../llm/gemini';

export default async function safetyFilter(req: Request, res: Response, next: NextFunction) {
  try {
    const { prompt } = req.body;

    const systemPrompt = `
      Analyze this prompt for children's game creation suitability. 
      Block if contains any of: violence, explicit content, adult themes.
      Response format: "safe" or "unsafe"
    `;
    const safetyCheck = await executePrompt(prompt, systemPrompt);

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
