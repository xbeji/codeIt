
export const generateIframeContent = (html: string, css: string, js: string): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          // Override alert, prompt and confirm to send messages to parent window
          window.alert = function(message) {
            window.parent.postMessage({type: 'alert', message: message}, '*');
          };
          
          window.prompt = function(message, defaultValue) {
            return window.parent.postMessage({type: 'prompt', message: message, defaultValue: defaultValue}, '*');
          };
          
          window.confirm = function(message) {
            return window.parent.postMessage({type: 'confirm', message: message}, '*');
          };

          // Run the user's JavaScript
          try {
            ${js}
          } catch(error) {
            console.error("Error in user JavaScript:", error);
            window.parent.postMessage({type: 'error', message: error.message}, '*');
          }
        </script>
      </body>
    </html>
  `;
};

export const validateCode = (
  userHtml: string,
  userCss: string,
  userJs: string,
  solutionHtml: string,
  solutionCss: string,
  solutionJs: string
): { 
  isCorrect: boolean; 
  htmlCorrect: boolean;
  cssCorrect: boolean;
  jsCorrect: boolean;
  feedback: string; 
} => {
  // Normalize whitespace and compare
  const normalizeCode = (code: string) => code.replace(/\s+/g, ' ').trim();

  // Simple HTML validation (this is basic, we'd need more complex validation for real parsing)
  let htmlCorrect = false;
  if (solutionHtml) {
    const normalizedUserHtml = normalizeCode(userHtml);
    const normalizedSolutionHtml = normalizeCode(solutionHtml);
    htmlCorrect = normalizedUserHtml.includes(normalizedSolutionHtml.replace(/"/g, '')) || 
                  normalizedUserHtml.includes(normalizedSolutionHtml);
  } else {
    htmlCorrect = true;
  }

  // Simple CSS validation
  let cssCorrect = false;
  if (solutionCss) {
    const normalizedUserCss = normalizeCode(userCss);
    const normalizedSolutionCss = normalizeCode(solutionCss);
    cssCorrect = normalizedUserCss.includes(normalizedSolutionCss.replace(/\s*\{\s*/g, '{').replace(/\s*\}\s*/g, '}')) ||
                 normalizedUserCss.includes(normalizedSolutionCss);
  } else {
    cssCorrect = true;
  }

  // Simple JS validation
  let jsCorrect = false;
  if (solutionJs) {
    const normalizedUserJs = normalizeCode(userJs);
    const normalizedSolutionJs = normalizeCode(solutionJs);
    jsCorrect = normalizedUserJs.includes(normalizedSolutionJs.replace(/\s*\{\s*/g, '{').replace(/\s*\}\s*/g, '}')) ||
                normalizedUserJs.includes(normalizedSolutionJs);
  } else {
    jsCorrect = true;
  }

  const isCorrect = htmlCorrect && cssCorrect && jsCorrect;
  
  let feedback = isCorrect 
    ? "Great job! Your solution is correct." 
    : "Your solution needs some work. ";
  
  if (!htmlCorrect) feedback += "Check your HTML. ";
  if (!cssCorrect) feedback += "Check your CSS. ";
  if (!jsCorrect) feedback += "Check your JavaScript. ";
  
  return {
    isCorrect,
    htmlCorrect,
    cssCorrect,
    jsCorrect,
    feedback
  };
};
