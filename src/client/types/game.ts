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
export interface Game {
  id: string;
  title: string;
  code: string;
  summary: string;
  createdAt: Date;
  messages: Message[];
}

export type Role = 'user' | 'model';

export class Message {
  content: string;
  role: Role;

  constructor(content: string, role: Role) {
    this.content = content;
    this.role = role;
  }

  isBot() {
    return this.role === 'model';
  }
}

export const createMessage = (content: string, role: Role) => {
  return new Message(content, role);
};
