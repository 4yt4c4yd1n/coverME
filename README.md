## Writes cover letters for your job applications(only LinkedIn is supported)

1. Get an OpenAI API key from https://openai.com/api/
2. Paste it in .env file(remove the square brackets)
3. In app.js add your filename and directories for tex files and pdf files
4. In extension/coverME.js customize the prompt to your liking
5. Open a terminal in coverME directory and run `node app.js`
6. Go to about:debugging#/runtime/this-firefox, click on 'Load Temporary Addon' and select any file in extension folder
7. A cover letter should be generated when you click on the extension icon while a LinkedIn job listing tab is active.

Pdf generation may fail due to ChatGPT hallucinating/not following directives. Retrying until desired result is recommended.
