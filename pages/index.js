import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import slothlogo from '../assets/king_the_sloth.jpg';
import dummy1 from '../assets/king.png';
import dummy2 from '../assets/houdsont.jpg';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...");

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      const { output } = data;
      // console.log("OpenAI replied...", output.text);
      setApiOutput(output.text);
    } catch (error) {
      console.error(error);
      // Handle the error accordingly
    }

    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Sloth AI🦥</h1>
          </div>
          <div className="header-subtitle">
            <h2>YOUR PERSONAL ASSISTANT</h2>
          </div>
        </div>

        <div className="prompt-container">
          <textarea
            placeholder="Please ask me anything"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />

          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>

        <Image src={slothlogo} width={350} height={500} alt="king_the_sloth" />
        <Image src={dummy1} width={50} height={50} alt="king.png" />
        <Image src={dummy2} width={50} height={50} alt="houdsont.jpg" />
      </div>

      <div className="badge-container grow">
        <a href="" target="_blank" rel="noreferrer">
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>built by a human</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
