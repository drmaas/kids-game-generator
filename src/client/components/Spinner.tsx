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
export default function Spinner() {
  return (
    <div className="spinner-border animate-spin inline-block w-16 h-16 border-8 border-dashed rounded-full" role="status">
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="yellow" />
        <circle cx="12" cy="12" r="8" fill="red" />
        <circle cx="12" cy="12" r="6" fill="yellow" />
        <circle cx="12" cy="12" r="4" fill="red" />
        <circle cx="12" cy="12" r="2" fill="yellow" />
      </svg>
    </div>
  );
}
