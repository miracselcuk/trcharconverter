import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const characterMap = {
    ı: 'i', i: 'ı',
    o: 'ö', ö: 'o',
    c: 'ç', ç: 'c',
    g: 'ğ', ğ: 'g',
    s: 'ş', ş: 's',
    I: 'İ', İ: 'I',
    O: 'Ö', Ö: 'O',
    C: 'Ç', Ç: 'C',
    G: 'Ğ', Ğ: 'G',
    S: 'Ş', Ş: 'S',
    u: 'ü', ü: 'u',
    U: 'Ü', Ü: 'U'
  };

  const convertCharacters = (char) => {
    return characterMap[char] || char;
  };

  const handleClick = (index) => {
    const char = inputText[index];
    const convertedChar = convertCharacters(char);

    if (char !== convertedChar) {
      const newText =
        inputText.substring(0, index) +
        convertedChar +
        inputText.substring(index + 1);
      setInputText(newText);
    }
  };

  const letters = inputText.split('').map((letter, index) => (
    <span
      key={index}
      onClick={() => handleClick(index)}
      className="hover:text-yellow-600 cursor-pointer"
    >
      {letter}
    </span>
  ));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letters.map(letter => letter.props.children).join(''))
  };

  return (
    <div className="flex space-x-4 flex-col mx-auto mt-20 space-y-10 w-[400px] h-auto">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Text"
        className="border border-slate-400 rounded-lg p-4 items-center"
      />
      <div className='flex flex-row justify-between'>
        <span className="text-4xl text-white">{letters}</span>
        {inputText.length > 0
          ? <img src='copy.svg' width={32} height={32} className="cursor-pointer" onClick={copyToClipboard} />
          : ''
        }
      </div>
    </div>
  );
}

export default App;