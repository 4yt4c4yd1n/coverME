async function scrape(){
    let jobTitle = document.getElementsByClassName("t-24 t-bold inline")[0].innerText
    let company = document.getElementsByClassName("ember-view link-without-visited-state inline-block t-black")[0].innerText
    let jobDescription = document.getElementById("job-details").innerText
    jobDescription = jobDescription.substring(jobDescription.indexOf("\n") + 1)

    console.log("Scraped")
    promptStr = `
    My profile:\n
    \t+ Contact Information:\n
    \t\t- Name, Surname: [YOUR NAME]\n
    \t\t- E-mail: [YOUR E-MAIL]\n
    \t\t- Address: [YOUR ADDRESS]\n
    \t\t- Phone Number: [YOUR PHONE NUMBER]
    \t+ Job Relevant Information:
    \t\t- [YOUR INFO]\n
    Job Posting:\n
    \t+ Job Language: Infer from the job listing
    \t+ Job Title: ${jobTitle}\n
    \t+ Company Name: ${company}\n
    \t+ Job Description: ${jobDescription}\n
    \t+ Company Address: Infer from job listing; if not available, say [CITY]\n
    I want you to write LaTeX code for a cover letter for the job above. Also import graphicx package. Insert today's date with \\date{\\today}.\n
    Don't forget to escape special characters(like #). 
    Only respond with code as plain text without code block syntax around it.\n
    Important: Write the text in 'Job Language'. Use everyday language. Only use most relevant info from my profile.`;
    browser.runtime.sendMessage({ trigger: 'promptReady', promptStr });
}

browser.runtime.onMessage.addListener(data => {
    const { trigger } = data;
    if (trigger === 'scrape') scrape();
  });