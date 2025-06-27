import { useState, useCallback, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+[]{}|;:,.<>?`~';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  }, [password]);

  // password strength calculation
  const getStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { label: 'Weak', color: 'text-red-500' };
    if (strength === 2) return { label: 'Medium', color: 'text-yellow-400' };
    return { label: 'Strong', color: 'text-green-500' };
  };

  const strength = getStrength(password);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-700 px-4">
      <div className="w-full max-w-3xl mx-auto shadow-lg rounded-2xl px-10 py-10 text-amber-600 bg-gray-500">
        <h1 className="text-4xl font-extrabold text-center mb-8 whitespace-nowrap">
          Password Generator <br />By Aditya
        </h1>

        <div className="flex flex-col mb-6 space-y-2">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="flex-grow px-4 py-3 bg-white text-black text-lg rounded focus:outline-none"
              placeholder="password"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={passwordGenerator}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-5 py-3 rounded"
            >
              Generate
            </button>
            <button
              onClick={copyPassword}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-5 py-3 rounded"
            >
              Copy
            </button>
          </div>

          {/* password strength display */}
          {password && (
            <div className={`text-sm font-semibold mt-1 ${strength.color}`}>
              Strength: {strength.label}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="text-white text-lg">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-1/2"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <label className="text-white text-lg">Include Numbers</label>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-white text-lg">Include Special Characters</label>
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
