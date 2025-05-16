
export interface QuizQuestion {
  id: number;
  question: string;
  htmlTemplate: string;
  cssTemplate: string;
  jsTemplate: string;
  htmlSolution: string;
  cssSolution: string;
  jsSolution: string;
  hint: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Create a paragraph with class 'greet' containing the text 'Hello' and style it blue using CSS.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "<p class=\"greet\">Hello</p>",
    cssSolution: ".greet { color: blue; }",
    jsSolution: "",
    hint: "Use <p class=\"greet\">Hello</p> and .greet { color: blue; } in CSS."
  },
  {
    id: 2,
    question: "Create a heading <h1> with the text 'Heading' styled inline to be red.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "<h1 style=\"color:red;\">Heading</h1>",
    cssSolution: "",
    jsSolution: "",
    hint: "Use <h1 style=\"color:red;\">Heading</h1>."
  },
  {
    id: 3,
    question: "Add a button with text 'Click Me' that alerts 'Hello World' when clicked.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n// Define the sayHi function here\n\n",
    htmlSolution: "<button onclick=\"sayHi()\">Click Me</button>",
    cssSolution: "",
    jsSolution: "function sayHi() {\n  alert('Hello World');\n}",
    hint: "Button text must be 'Click Me' and onclick must call sayHi() that alerts 'Hello World'."
  },
  {
    id: 4,
    question: "Style a div with class 'box' containing 'Box' with a 20px border-radius.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "<div class=\"box\">Box</div>",
    cssSolution: ".box {\n  border-radius: 20px;\n  border: 1px solid #000;\n  padding: 10px;\n}",
    jsSolution: "",
    hint: "Use .box { border-radius: 20px; } in CSS and <div class=\"box\">Box</div> in HTML."
  },
  {
    id: 5,
    question: "Add box-shadow '4px 4px 10px rgba(0,0,0,0.3)' to a div with class 'shadow-box' and text 'Shadow'.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "<div class=\"shadow-box\">Shadow</div>",
    cssSolution: ".shadow-box {\n  box-shadow: 4px 4px 10px rgba(0,0,0,0.3);\n  padding: 10px;\n}",
    jsSolution: "",
    hint: "Use .shadow-box { box-shadow: 4px 4px 10px rgba(0,0,0,0.3); } and <div class=\"shadow-box\">Shadow</div>."
  },
  {
    id: 6,
    question: "Use text-shadow '2px 2px 3px gray' on a paragraph with id 'shadow-text' and content 'Shadow Text'.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "<p id=\"shadow-text\">Shadow Text</p>",
    cssSolution: "#shadow-text {\n  text-shadow: 2px 2px 3px gray;\n}",
    jsSolution: "",
    hint: "Use <p id=\"shadow-text\">Shadow Text</p> and CSS with text-shadow."
  },
  {
    id: 7,
    question: "Create a div with class 'gradient-box' and text 'Gradient' with red-yellow background gradient.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "<div class=\"gradient-box\">Gradient</div>",
    cssSolution: ".gradient-box {\n  background: linear-gradient(to right, red, yellow);\n  padding: 10px;\n  color: black;\n}",
    jsSolution: "",
    hint: "Use background: linear-gradient(to right, red, yellow); in CSS."
  },
  {
    id: 8,
    question: "Declare a JS variable 'count' and assign 5 to it.",
    htmlTemplate: "<!-- Your HTML code here -->\n<div id=\"output\"></div>",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n// Show the value in the output div\n",
    htmlSolution: "<div id=\"output\"></div>",
    cssSolution: "",
    jsSolution: "var count = 5;\ndocument.getElementById('output').textContent = 'count = ' + count;",
    hint: "Use var count = 5;"
  },
  {
    id: 9,
    question: "Use an if statement to alert 'Even' if variable num = 4 is even.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n// Define num = 4 and check if it's even\n\n",
    htmlSolution: "",
    cssSolution: "",
    jsSolution: "var num = 4;\nif (num % 2 === 0) {\n  alert('Even');\n}",
    hint: "Use if (num % 2 === 0) alert('Even');"
  },
  {
    id: 10,
    question: "Prompt for user's name and alert 'Hello, [name]!'.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "",
    cssSolution: "",
    jsSolution: "var name = prompt('What is your name?');\nalert('Hello, ' + name + '!');",
    hint: "Use prompt to get the name and alert a greeting."
  },
  {
    id: 11,
    question: "Write a for-loop to alert numbers 1 to 5.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "",
    cssSolution: "",
    jsSolution: "for (let i = 1; i <= 5; i++) {\n  alert(i);\n}",
    hint: "Use for (let i = 1; i <= 5; i++) alert(i);"
  },
  {
    id: 12,
    question: "Write a while-loop that alerts 'Hello' 3 times.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n\n",
    htmlSolution: "",
    cssSolution: "",
    jsSolution: "let i = 0;\nwhile (i < 3) {\n  alert('Hello');\n  i++;\n}",
    hint: "Use a while loop with a counter variable."
  },
  {
    id: 13,
    question: "Write an if-else statement that alerts 'Positive' if num > 0 else 'Non-positive'. Use num = 5.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n// Set num = 5 and check if positive\n\n",
    htmlSolution: "",
    cssSolution: "",
    jsSolution: "var num = 5;\nif (num > 0) {\n  alert('Positive');\n} else {\n  alert('Non-positive');\n}",
    hint: "Use if (num > 0) alert('Positive'); else alert('Non-positive');"
  },
  {
    id: 14,
    question: "Write a switch statement to alert 'One', 'Two' or 'Other' for values 1, 2, or default with num = 2.",
    htmlTemplate: "<!-- Your HTML code here -->\n\n",
    cssTemplate: "/* Your CSS code here */\n\n",
    jsTemplate: "// Your JavaScript code here\n// Set num = 2 and use a switch statement\n\n",
    htmlSolution: "",
    cssSolution: "",
    jsSolution: "var num = 2;\nswitch(num) {\n  case 1:\n    alert('One');\n    break;\n  case 2:\n    alert('Two');\n    break;\n  default:\n    alert('Other');\n}",
    hint: "Use switch(num) { case 1: ...; case 2: ...; default: ...; }"
  }
];
