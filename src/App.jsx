import { useState, useCallback, useEffect, useRef } from "react";
import "../src/App.css";
function App() {
  const [length, setLenght] = useState(8);
  const [isNumber, setisNumber] = useState(false);
  const [isCharacter, setisCharacter] = useState(false);
  const [password, setPassword] = useState("");
  // const [copyNotification, setCopyNotification] = useState(false);
  const [copyText, setCopyText] = useState('copy');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(
    (e) => {
      let pass = "";
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (isCharacter) str += "~!@#$%^&*()";
      if (isNumber) str += "0123456789";

      for (let i = 0; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }

      setPassword(pass);
    },
    [length, isNumber, isCharacter, setPassword]
  );

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
    setCopyText('Copied')
    setTimeout(() => {
      setCopyText('copy')
    }, 1000);

    setCopyNotification(true);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumber, isCharacter, setPassword]);

  // setTimeout(() => {
  //   setCopyNotification('false');
  // }, 3000);

  return (
    <>
      <div className="container w-full max-w-lg h-56 mx-96 shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500">
        <h1 className=" text-4xl text-center font-thin">password generator</h1>

        <div className="input flex flex-row mt-3">
          <input
            type="text"
            name="username"
            className="mt-5 ml-4 p-2 py-3 rounded-md w-3/4 outline-none shadow-md"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button
            className="button w-22 h-12 ml-5 mt-5 hover:border-red-500r"
            onClick={copyToClipboard}
          >
          <p className="text-1xl">{copyText} </p>
          </button>
        </div>


        {/* conditional rendering */}
        
        {/* {copyNotification && (
          <div className="text-green-500 mt-1 text-sm ml-5">
            copied to clipboard
          </div>
        )} */}

        <div className="ml-5 mt-10">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => {
              setLenght(e.target.value);
            }}
            className="mt-2"
          />
          <label className="ml-3">{length}</label>

          <div className="flex flex-row ml-52 gap-x-4 -mt-6">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              onChange={() => {
                setisNumber((prev) => !prev);
              }}
            />
            <label htmlFor="number" className="text-pretty">
              Numbers
            </label>

            <input
              type="checkbox"
              defaultChecked={isCharacter}
              onChange={() => {
                setisCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="number" className="text-pretty">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
