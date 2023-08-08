"use client"
"use client"
import React, { useState } from 'react';

export default function Home() {
  const [abstract, setAbstract] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent = async (selectedOption:string) => {
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
    <main className="mxy-3 h-5/6 items-center p-5 bg-sky-500">
      <div className="container h-4/5 my-auto mx-auto bg-sky-800 rounded-lg text-white p-10">
        <h1 className="my-3 font-sans text-center text-4xl font-bold p-3 drop-shadow-lg bg-red-600">
          Information generator for Research paper by Worqhat
        </h1>
        <div className='flex flex-row my-auto mx-auto'>
          <div className="text-center container rounded-md text-#D8D9DA my-auto mx-auto p-8 w-1/3 flex flex-col items-center">
            <div className=''>
              <h2 className='p-1 m-1'>Paste your abstract here:</h2>
              <textarea
                value={abstract}
                onChange={(event) => setAbstract(event.target.value)}
                className="border-2 text-black rounded-md p-4 text-center drop-shadow-xl"
                placeholder="Paste your abstract here"
                rows={11}
                cols={50}
              ></textarea>
            </div>
            <div className='text-black m-3 p-3  bg-sky-500 rounded-md'>
              <label htmlFor="dropdown">Select an option to generate:</label>
              
              <select id="dropdown" className='p-1 m-1 rounded-md' onChange={(event) => generateContent(event.target.value)}>
                <option value="Introduction">Introduction</option>
                <option value="Methodology">Methodology</option>
                <option value="Objectives">Conclusion</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-96 btn bg-green-500 text-white p-3 mx-auto cursor-pointer rounded-md"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-md text-white p-5 y-auto mx-auto">
          <h2 className='p-1 m-1 text-black'>Here you will get the generated response from Worqhat:</h2>
            <textarea
              className="border-2 text-black rounded-md p-4 text-center drop-shadow-xl"
              id=""
              cols={50}
              rows={15}
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
