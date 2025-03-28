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
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../types/game';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export const executePrompt = async (userPrompt: Message[] | string, systemPrompt: string) => {
  // convert to LLM format
  if (typeof userPrompt === 'string') {
    return model.generateContent({
      systemInstruction: systemPrompt,
      contents: [{ parts: [{ text: userPrompt }], role: 'user' }],
    });
  } else {
    const mappedUserPrompt: Content[] = userPrompt.map((m: Message) => {
      return {
        parts: [{ text: m.content }],
        role: m.role,
      };
    });
    return model.generateContent({
      systemInstruction: systemPrompt,
      contents: mappedUserPrompt,
    });
  }
};
