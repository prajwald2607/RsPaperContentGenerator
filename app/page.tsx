"use client"
import React, { useState } from 'react';

export default function Home() {
  const [abstract, setAbstract] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent = async (selectedOption: string) => {
    setIsLoading(true);
    try {
      const question = `Generate ${selectedOption} for the given abstract:\n${abstract}`;
      const requestData = {
        question,
        randomness: 0.4,
      };

      const response = await fetch('https://api.worqhat.com/api/ai/content/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'U2FsdGVkX187FPQxzgbmIVjXh3O1+xyor30KWVrIBMuFEqGv8NfzXPjE53e3Ju+T',
          'x-org-key': 'U2FsdGVkX19lq3bhhF5TRouMiyL2HvEBD2V5j5nNl6dNL9JWPbsXW0rqlzssW8GieFki6oRVDKTb/z01Hc7m+Q==',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.content) {
        setGeneratedContent(data.content);
      } else {
        console.error('Error generating content: Unexpected API response format');
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full flex justify-center items-center bg-sky-500">
      <div className="container bg-sky-800 rounded-lg text-white m-20 p-14 w-full ">
        <h1 className="text-center text-4xl font-bold mb-6">
          Information generator for Research paper by Worqhat
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mb-4 md:mb-0 md:mr-4">
            <textarea
              value={abstract}
              onChange={(event) => setAbstract(event.target.value)}
              className="border-2 text-black rounded-md p-4 text-center drop-shadow-xl w-full h-40 md:h-60"
              placeholder="Paste your abstract here"
            ></textarea>
            <div className="text-black mt-3 bg-sky-500 p-3 rounded-md">
              <label htmlFor="dropdown">Select an option to generate:</label>
              <select
                id="dropdown"
                className="border rounded-md p-2 w-full"
                onChange={(event) => generateContent(event.target.value)}
              >
                <option value="Introduction">Introduction</option>
                <option value="Methodology">Methodology</option>
                <option value="Objectives">Conclusion</option>
              </select>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn bg-green-600 text-white p-3 w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
          <div className="flex-1">
            <textarea
              className="border-2 text-black rounded-md p-4 text-center drop-shadow-xl w-full h-40 md:h-96"
              id=""
              cols={40}
              rows={8}
              placeholder="Here you will get the generated response from Worqhat"
              value={isLoading ? 'Generating content...' : generatedContent}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
}
