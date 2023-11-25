function calculate(expression: string): number {
  const isNumber = (s: string) => !isNaN(parseFloat(s)) && isFinite(+s);

  const applyOperator = (operators: string[], values: number[]) => {
    const operator = operators.pop();
    const right = values.pop()!;
    const left = values.pop()!;
    switch (operator) {
      case "+":
        values.push(left + right);
        break;
      case "-":
        values.push(left - right);
        break;
      case "×":
      case "*":
        values.push(left * right);
        break;
      case "/":
      case "÷":
        values.push(left / right);
        break;
      case "%":
        values.push(left % right);
        break;
      default:
        throw new Error(`Unexpected operator: ${operator}`);
    }
  };

  const precedence = (op: string) => {
    switch (op) {
      case "+":
      case "-":
        return 1;
      case "×":
      case "*":
      case "÷":
      case "/":
      case "%":
        return 2;
      default:
        return 0;
    }
  };

  const evaluate = (tokens: string[]) => {
    const values: number[] = [];
    const operators: string[] = [];
    let i = 0;

    while (i < tokens.length) {
      if (tokens[i] === " ") {
        i++;
        continue;
      }

      if (isNumber(tokens[i])) {
        let j = i;
        while (j < tokens.length && isNumber(tokens[j])) {
          j++;
        }
        values.push(parseFloat(tokens.slice(i, j).join("")));
        i = j;
      } else if (["+", "-", "×", "*", "÷", "/", "%"].includes(tokens[i])) {
        while (
          operators.length > 0 &&
          precedence(operators[operators.length - 1]) >= precedence(tokens[i])
        ) {
          applyOperator(operators, values);
        }
        operators.push(tokens[i]);
        i++;
      } else if (tokens[i] === "(") {
        operators.push(tokens[i]);
        i++;
      } else if (tokens[i] === ")") {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "("
        ) {
          applyOperator(operators, values);
        }
        operators.pop();
        i++;
      }
    }

    while (operators.length > 0) {
      applyOperator(operators, values);
    }

    return values[0];
  };

  // Tokenize the expression
  const tokens: string[] = expression.split("");
  const result = evaluate(tokens);
  return result;
}

// Example usage:
export default calculate;
