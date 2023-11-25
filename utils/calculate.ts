const calculate = (expression: string) => {
  const isNumber = (s: string) => !isNaN(parseFloat(s)) && isFinite(+s);

  const applyOperator = (operators: string[], values: number[]) => {
    const operator = operators.pop();
    const right = values.pop()!;
    const left = values.pop()!;
    if (operator === "+") {
      values.push(left + right);
    } else if (operator === "-") {
      values.push(left - right);
    } else if (operator === "x") {
      values.push(left * right);
    } else if (operator === "/") {
      values.push(left / right);
    }
  };

  const precedence = (op: string) => {
    if (op === "+" || op === "-") {
      return 1;
    } else if (op === "x" || op === "/") {
      return 2;
    }
    return 0;
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
      } else if (
        tokens[i] === "+" ||
        tokens[i] === "-" ||
        tokens[i] === "x" ||
        tokens[i] === "/"
      ) {
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
};

// Example usage:
export default calculate;
