import { useState } from "react";

const symbols = ["*", "/", "+", "-", ".", "00"];
let isStartNewNumber = true;
let isFloat = false;

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [prevInput, setPrevInput] = useState("");

  const updateInput = (value) => {
    const isStartOfNewNumber = isStartNewNumber && symbols.includes(value);
    const isDoubleZeroAtBeginning =
      input.slice(-1) === "0" &&
      (symbols.slice(0, -2).includes(input.charAt(input.length - 2)) ||
        input.length === 1) &&
      value !== "." &&
      !symbols.slice(0, -2).includes(value);
    const isSecondDotInNumber = isFloat && value === ".";
    const isOperatorAfterDot =
      input.charAt(input.length - 1) === "." &&
      symbols.slice(0, -2).includes(value);

    if (
      isStartOfNewNumber ||
      isDoubleZeroAtBeginning ||
      isSecondDotInNumber ||
      isOperatorAfterDot
    ) {
      return;
    }

    if (symbols.slice(0, -2).includes(value)) {
      // if entered operator symbol, mark start of new number
      isStartNewNumber = true;
      isFloat = false;
    } else if (value === ".") {
      isFloat = true;
    } else {
      isStartNewNumber = false;
    }

    let new_input = input + value;
    setInput(new_input);

    updateResult(new_input);
  };

  const updateResult = (new_input) => {
    // if last symb is operator, calculate without it
    if (new_input.length == 0) {
      setResult("");
    }
    let result;
    try {
      if (symbols.includes(new_input.slice(-1))) {
        result = eval(new_input.slice(0, -1)).toString()
      } else {
        result = eval(new_input).toString()
      }
      setResult(result);
    } catch {
      alert("Error!");
    }
  };

  const deleteLast = () => {
    let new_input;
    if (input === "" || input === "Infinity") {
      setInput("");
      setResult("");
      return;
    }

    new_input = input.slice(0, -1);
    setInput(new_input);
    updateResult(new_input);
  };

  const calculate = () => {
    if (input.slice(-1) === ".") {
      isFloat = false;
    }
    setPrevInput(input);
    setInput(result);
  };

  const clear = () => {
    setPrevInput("");
    setInput("");
    setResult("");
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="last-evaluated">{prevInput}</div>
        <div className="input-line">{input}</div>
        <div className="result-line">{result}</div>
      </div>

      <div className="buttons">
        <button className="clear" onClick={clear}>
          Clear
        </button>
        <button onClick={() => deleteLast()}>Del</button>
        <button className="operators" onClick={() => updateInput("/")}>
          /
        </button>

        <button onClick={() => updateInput("7")}>7</button>
        <button onClick={() => updateInput("8")}>8</button>
        <button onClick={() => updateInput("9")}>9</button>
        <button className="operators" onClick={() => updateInput("*")}>
          *
        </button>

        <button onClick={() => updateInput("4")}>4</button>
        <button onClick={() => updateInput("5")}>5</button>
        <button onClick={() => updateInput("6")}>6</button>
        <button className="operators" onClick={() => updateInput("-")}>
          -
        </button>

        <button onClick={() => updateInput("1")}>1</button>
        <button onClick={() => updateInput("2")}>2</button>
        <button onClick={() => updateInput("3")}>3</button>
        <button className="operators" onClick={() => updateInput("+")}>
          +
        </button>

        <button onClick={() => updateInput("00")}>00</button>
        <button onClick={() => updateInput("0")}>0</button>
        <button onClick={() => updateInput(".")}>.</button>
        <button className="equal" onClick={() => calculate()}>
          =
        </button>
      </div>
    </div>
  );
}
