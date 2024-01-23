class Lexer {
    constructor(input) {
      this.input = input;
      this.pos = 0;
      this.reservedWords = {
        'main': 'MAIN',
        'tons': 'ELSE',
        'ira': 'IF',
        ',': 'COMMA',
        'en': 'IN',
        'vos': 'FOR',
        'act': 'DEF',
        'mostralo': 'SHOW',
        '->': 'ARROW',
        '==': 'EQUAL',
        '>': 'GREATER_THAN',
        '>=': 'LESS_THAN',
        '<=': 'LESS_OR_EQUAL',
        '!=': 'NOT_EQUAL',
        '&&': 'AND',
        '||': 'OR',
        ')': 'PARENTHESIS_CLOSE',
        '(': 'PARENTHESIS_OPEN',
        '{': 'OPEN_BRACKETS',
        '}': 'CLOSE_BRACKETS',
        '"': 'QUOTATION_MARKS',
        '+': 'ADDITION',
        '-': 'SUBTRACTION',
        '*': 'MULTIPLY', 
        '/': 'DIVISION',
        "'": 'SINGLE_QUOTE'
        
      };
    }
  
    nextToken() {
        this.skipWhitespace();
        if (this.pos >= this.input.length) {
          return null;
        }
        for (let word in this.reservedWords) {
          if (this.input.substr(this.pos, word.length) === word) {
            this.pos += word.length;
            return { type: this.reservedWords[word], value: word };
          }
        }
        let char = this.input[this.pos];
        let number = '';
        while (this.pos < this.input.length && /[0-9]/.test(char)) {
          number += char;
          this.pos++;
          char = this.input[this.pos];
        }
        if (number !== '') {
          return { type: 'NUMBER', value: number };
        }
        let word = '';
        while (this.pos < this.input.length && /[a-z0-9]/i.test(char)) {
          word += char;
          this.pos++;
          char = this.input[this.pos];
        }
        if (word !== '') {
          return { type: 'UNCATEGORIZED_WORDS', value: word };
        }
        this.pos++;
        return { type: 'UNKNOWN', value: char };
      }
  
    skipWhitespace() {
      while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
        this.pos++;
      }
    }
  }
  
  const lexer = new Lexer('HOLA23 main');
  let token;
  while (token = lexer.nextToken()) {
    console.log(token);
  }