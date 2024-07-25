const OpenAI = require("openai");
require("dotenv").config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });
const cors = require('cors');
const express = require('express');
const app = express();
const { spawn } = require('node:child_process');
const fs = require('node:fs');

app.use(express.json());
app.use(cors({credentials: true, origin: true}));

app.post("/", (req, res) =>{
    console.log("Generating...");
    getResponse(req.body.prompt);
})

signature = `\\footnote{
            \\begin{center}
            \\includegraphics[width=32px]{ChatGPT-Logo.png}\\\\
            \\scriptsize{Information on this page is correct, but it was generated automatically. \\\\
            For more information visit: github.com/4yt4c4yd1n/coverME }
            \\end{center}}`

async function getResponse(prompt){
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o-mini",
      });
    
    TeXstring = completion.choices[0].message.content

    TeXstring = TeXstring.slice(0, TeXstring.lastIndexOf('\\')) + signature + TeXstring.slice(TeXstring.lastIndexOf('\\'))

    var filename = '[Filename]'+Date.now()
    var texdir = '[DIR]'
    var pdfdir = '[DIR]'

    fs.writeFile(texdir+filename+'.tex', TeXstring, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Generated .tex file...')
        }
      })

    var pdflatex = spawn('pdflatex', [`-output-directory=${pdfdir}`,`${texdir+filename+'.tex'}`], {shell:true});
    console.log("Generating PDF...")

    pdflatex.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });

    pdflatex.on('exit', function (code) {
        console.log('PDF generated with code ' + code);
        spawn('explorer', [`${pdfdir+filename+'.pdf'}`], {shell:true});
    });
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));