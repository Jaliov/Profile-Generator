const axios = require('axios');
const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "username"
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
            message: "What kind of license should your project have?",
            choices: ["MIT","Apache","Mozilla"],
            name: "licensetype"
        },
       
        {
            type: "input",
            message: "What command should be run to run tests?",
            name: "tests",
            default: "npm test"
        },
        {
            type: "input",
            message: "What does the user need to know about using the repo?",
            name: "about"
        },
        {
            type: "input",
            message: "What does the user need to know about contributing to the repo?",
            name: "contributing"
        }
    ]).then(function(answer) {
        
        const queryURL = `https://api.github.com/users/${answer.username}`;

        //fetch data using axios
        
        axios.get(queryURL).then(function(res) {
            console.log(res)
            let userImage = res.data.avatar_url

            console.log("answer", JSON.stringify(answer));
            console.log(userImage)

            const data = getData(answer, userImage);

            fs.writeFile("README.md", data, function() {

            });
        })   
    });


function getData({username, project, description, licensetype, dependencies, tests, about, contributing},userImage) {

    console.log("project",project);
    return `
# ${project}
## Description
${description}
        
## Table of Contents
        
* [Installation](#installation)
        
* [Usage](#usage)
        
* [License](#license)
        
* [Contributing](#contributing)
        
* [Tests](#tests)
        
* [Questions](#questions)
        
`

}

    
