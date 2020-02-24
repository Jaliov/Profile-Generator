const axios = require('axios');
const inquirer = require("inquirer");
const fs = require("fs");


        function displyAnswers(answers) {
            console.log("answers ", answers)
        }

        var questions = [{

        type: "input",
            message: "user email: ",
            name: "userEmail"
    
        },
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "userName"
        },
        {
            type: "input",
            message: "What is your project's name?",
            name: "project"
        },
        {
            type: "input",
            message: "Short description of your project.",
            name: "description"
        },
        {
            type: "list",
            message: "What type of license should your project have?",
            choices: ["MIT","Apache","Mozilla"],
            name: "licenseType"
        },
       
        {
            type: "input",
            message: "What is the command to run tests?",
            name: "tests",
            default: "npm test"
        },
        {
            type: "input",
            message: "How is this repo used?",
            name: "repoUsuage"
        },
        {
            type: "input",
            message: "What does the user need to know about contributing to the repo?",
            name: "contribute"
        }
    
    ]
    inquirer.prompt(questions, displyAnswers ).then(function(answer)  {
        
        const queryURL = `https://api.github.com/users/${answer.userName}`;

        //fetch data using axios
        
        axios.get(queryURL).then(function(res) {
            console.log(res)
            let userImage = res.data.avatar_url

            console.log("answer", JSON.stringify(answer));
            console.log(userImage)

            const data = genMD(answer, userImage);

            fs.writeFile("README.md", data, function() {
                   
            });
        })   
    });


function genMD({userName, userEmail, project, description, licenseType, tests,  repoUsuage, contribute},userImage) {

    console.log("project",project);
    return `
##${userEmail}
##${userName}
# ${project}
## Description
${description}
        
## Table of Contents
        
* [Installation](#installation)
        
* [Usage](#usage)
        
* [License]${licenseType}
        
* [Contributing](#contributing)
        
* [Tests](#tests)
        
* [Questions](#questions)
  
        
`

}

    
