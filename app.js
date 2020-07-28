const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let id = 1;

async function main(){
    const team = [];

    const managerData = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the manager's name"
        },
        {
            name: "email",
            type: "input",
            message: "Enter the email address"
        },
        {
            name: "officeNumber",
            type: "input",
            message: "Enter the office number"
        },
        {
            name: "count",
            type: "input",
            message: "Enter how many people work under the manager"
        }
    ]);
    team.push(new Manager(managerData.name, id++, managerData.email, managerData.officeNumber, managerData.count));

    for(let userCnt = 1; userCnt<=managerData.count; userCnt++){
        const user = await inquirer.prompt([
            {
                name: "type",
                type: "list",
                message: `Employee # ${userCnt} under ${managerData.name}`,
                choices: ["Engineer", "Intern"]
            }
        ])
        if (user.type == "Engineer"){
            const userData = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter the enginner's name"
                },
                {
                    name: "email",
                    type: "input",
                    message: "Enter the email address"
                },
                {
                    name: "github",
                    type: "input",
                    message: "Enter the github user name"
                }
            ])
            team.push(new Engineer(userData.name, id++, userData.email, userData.github));
        }
        else{
            const userData = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter the intern's name"
                },
                {
                    name: "email",
                    type: "input",
                    message: "Enter the email address"
                },
                {
                    name: "school",
                    type: "input",
                    message: "Enter the school name"
                }
            ])
            team.push(new Intern(userData.name, id++, userData.email, userData.school));
        }
    }
    const html = render (team)

    fs.writeFileSync (outputPath, html);
}

main();