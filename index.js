const axios = require('axios');
const inquirer = require("inquirer");
const fs = require("fs");
var joi = require('joi');

function onValidation(err, val) {
    if (err) {
        console.log(err.message);
        return err.message;
    } else {
        return true;
    }
}

function validateEmail(email) {
    return joi.validate(email, joi.string().email(), onValidation);
}

function displyAnswers(answers) {
    console.log("answers ", answers)
}

var questions = [{

        message: "What's your email?: ",
        type: "input",
        name: "email",
        validate: validateEmail

    },
    {
        type: "input",
        message: "What is your GitHub user name? ",
        name: "userName"
    },
    {
        type: "input",
        message: "What is your project's name? ",
        name: "project"
    },
    {
        type: "input",
        message: "Short description of your project: ",
        name: "description"
    },
    {
        type: "list",
        message: "What type of license should your project have? ",
        choices: ["MIT", "Apache", "Mozilla"],
        name: "licenseType"
    },

    {
        type: "input",
        message: "What is the command to run tests? ",
        name: "tests",
        default: "npm test"
    },
    {
        type: "input",
        message: "How is this repo used? ",
        name: "repoUsuage"
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo? ",
        name: "contribute"
    },
    {
        type: "input",
        message: "Installation Instructions: ",
        name: "installation"
    }

]
inquirer.prompt(questions).then(function (answers) {

    console.log(answers)

    const queryURL = `https://api.github.com/search/users?q=${answers.userName}`

    //axios
    axios.get(queryURL).then(function (res) {

        console.log(res.data)
        let userImage = res.data.items[0].avatar_url
        const markdownObject = {
            ...answers,
            userImage
        }

        const data = genMD(markdownObject);

        fs.writeFile("user-README.md", data, function (err) {
            if (err) throw err;
        });
    })

});

function genMD({
    project,
    userName,
    email,
    description,
    licenseType,
    tests,
    repoUsuage,
    contribute,
    installation,
    userImage,
}) {

    console.log("project", project);
    return `

## User Name: ${userName}

## User Email: ${email}

# Project Name: **${project}** #

* **Description:** ${description}
       
* **Usage:** ${repoUsuage}
        
* **License:** ${licenseType}

* **Tests:** ${tests}

* **Repo Usage:** ${repoUsuage}
        
* **Contributing:**  ${contribute}

* **Installation:** ${installation}
        
![user image](${userImage}.png)
     
`

}