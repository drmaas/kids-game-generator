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

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export default function ErrorToast({ message, onClose }: ErrorToastProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded shadow-lg z-50">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:bg-red-700 rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
