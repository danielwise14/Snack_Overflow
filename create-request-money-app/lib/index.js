"use strict";
const command_1 = require("@oclif/command");
const inquirer = require("inquirer");
const interac_1 = require("./interac");
const uuid_1 = require("uuid");
const chalk_1 = require("chalk");
const fs = require("fs-jetpack");
const commandExists = require("command-exists");
const path = require("path");
const Listr = require("listr");
const execa = require("execa");
const https = require("https");
const unzipper = require("unzipper");
function requireNotEmpty(input) {
    if (!input) {
        return 'input must not be empty';
    }
    return true;
}
const questions = [
    {
        type: 'input',
        name: 'unencryptedSecretKey',
        message: 'What is your unencrypted secret key',
        validate: requireNotEmpty,
    },
    {
        type: 'input',
        name: 'thirdPartyAccessId',
        message: 'What is your third party access id',
        validate: requireNotEmpty,
    },
    {
        type: 'input',
        name: 'apiRegistrationId',
        message: 'What is your api registration id',
        validate: requireNotEmpty,
    },
    {
        type: 'list',
        name: 'frontendFramework',
        message: 'What frontend template do you want to use?',
        choices: ['Basic/Barebones'],
    },
    {
        type: 'list',
        name: 'backendFramework',
        message: 'What backend do you want to use?',
        choices: ['Python (Flask)', 'Node (Express)'],
    },
    {
        type: 'list',
        name: 'jsOrTs',
        message: 'Do you use Javascript or Typescript?',
        choices: ['Javascript', 'Typescript'],
    },
    {
        type: 'list',
        name: 'serviceProvider',
        message: 'What is your service provider?',
        choices: ['Google Cloud Platform', 'Other'],
    },
];
class CreateRequestMoneyApp extends command_1.Command {
    async run() {
        const { args, flags: flags_ } = this.parse(CreateRequestMoneyApp);
        if (!args.appName) {
            console.log(chalk_1.default.red('Missing argument APPNAME'));
            return;
        }
        const { appName } = args;
        const answers = (await inquirer.prompt(questions));
        if (await fs.existsAsync(appName)) {
            const canProceed = (await inquirer.prompt({
                type: 'input',
                name: 'canProceed',
                message: `${chalk_1.default.red(`Directory ${appName} already exists.`)}\nType ${chalk_1.default.red('confirm')} to delete the directory or ${chalk_1.default.blue('exit')} to quit.`,
                validate: (input) => {
                    if (input !== 'confirm' && input !== 'exit') {
                        return `Type ${chalk_1.default.red('confirm')} or ${chalk_1.default.blue('exit')}`;
                    }
                    return true;
                },
            })).canProceed === 'confirm';
            if (!canProceed) {
                return;
            }
            else {
                await fs.removeAsync(appName);
            }
        }
        const { unencryptedSecretKey, thirdPartyAccessId, apiRegistrationId, backendFramework, frontendFramework, jsOrTs, serviceProvider, } = answers;
        let accessToken;
        const templateDir = path.join(__dirname, '..', 'templates');
        const tasks = new Listr([
            {
                title: 'Installing templates',
                task: async () => new Promise(async (res, rej) => {
                    if (flags_.dev) {
                        res();
                        return;
                    }
                    await fs.removeAsync(templateDir);
                    https.get('https://s3.amazonaws.com/create-request-money-app-2/templates.zip', (zipFile) => {
                        zipFile.pipe(unzipper.Extract({ path: templateDir }).on('close', () => {
                            res();
                        }));
                    });
                }),
            },
            {
                title: `Creating directory ${appName}`,
                task: async () => {
                    await fs.dirAsync(appName);
                },
            },
            {
                title: 'Generating your access token',
                task: async () => new Promise(async (res, rej) => {
                    try {
                        accessToken = (await interac_1.getAccessToken({
                            unencryptedSecretKey,
                            thirdPartyAccessId,
                            salt: uuid_1.v4(),
                        })).access_token;
                        res();
                    }
                    catch (err) {
                        rej(err);
                    }
                }),
            },
            {
                title: 'Writing your credentials to an environment file',
                task: async () => {
                    const envFile = fs.createWriteStream(`${appName}/.env`);
                    envFile.write(`THIRD_PARTY_ACCESS_ID=${thirdPartyAccessId}
API_REGISTRATION_ID=${apiRegistrationId}
ACCESS_TOKEN=${accessToken}`);
                    envFile.close();
                },
            },
            {
                title: 'Copying common files to your project',
                task: async () => {
                    await fs.copyAsync(`${path.join(templateDir, 'common')}`, `${appName}`, {
                        overwrite: true,
                    });
                },
            },
            {
                title: 'Creating your backend',
                task: async () => {
                    if (backendFramework === 'Python (Flask)') {
                        await fs.copyAsync(`${path.join(templateDir, 'server', 'python')}`, `${appName}`, {
                            overwrite: true,
                        });
                        return;
                    }
                    if (backendFramework === 'Node (Express)') {
                        if (jsOrTs === 'Typescript') {
                            await fs.copyAsync(`${path.join(templateDir, 'server', 'typescript')}`, `${appName}`, {
                                overwrite: true,
                            });
                        }
                        else {
                            await fs.copyAsync(`${path.join(templateDir, 'server', 'javascript')}`, `${appName}`, {
                                overwrite: true,
                            });
                        }
                    }
                },
            },
            {
                title: 'Creating your frontend',
                task: async () => {
                    if (frontendFramework === 'Basic/Barebones') {
                        if (jsOrTs === 'Typescript') {
                            await fs.copyAsync(`${path.join(templateDir, 'client', 'typescript')}`, `${appName}/app`, {
                                overwrite: true,
                            });
                        }
                        else {
                            await fs.copyAsync(`${path.join(templateDir, 'client', 'javascript')}`, `${appName}/app`, {
                                overwrite: true,
                            });
                        }
                    }
                },
            },
            {
                title: 'Installing frontend dependencies',
                task: () => execa('npm', ['install'], { cwd: `${appName}/app` }),
            },
            {
                title: 'Installing backend dependencies',
                enabled: () => backendFramework === 'Node (Express)',
                task: () => execa('npm', ['install'], { cwd: `${appName}` }),
            },
            {
                title: 'Setting up Google Cloud Platform',
                enabled: () => serviceProvider === 'Google Cloud Platform',
                task: async () => {
                    try {
                        await commandExists('gcloud');
                    }
                    catch (err) {
                        throw new Error('Install the Google Cloud Platform SDK before proceeding');
                    }
                },
            },
            {
                title: 'Initializing this folder as a git repository',
                task: () => execa.stdout('git', ['init'], { cwd: `${appName}` }),
            },
        ]);
        tasks
            .run()
            .then(() => {
            console.log('Your project has been successfully created\n');
            console.log('We suggest that you begin by typing:\n');
            console.log(`cd ${chalk_1.default.blue(appName)}`);
            console.log(`${chalk_1.default.blue('make')} start\n`);
            console.log(`To deploy on the Google Cloud Platform run:`);
            console.log(`${chalk_1.default.blue('make')} deploy-gcp\n`);
            console.log(`Happy hacking from ${chalk_1.default.yellow('Interac')}!\n`);
            console.log('For further information please visit https://developer.interac.ca/');
        })
            .catch((err) => {
            console.error(chalk_1.default.red(err));
        });
    }
}
CreateRequestMoneyApp.description = 'Create a web application using the Interac Request Money API';
CreateRequestMoneyApp.flags = {
    version: command_1.flags.version({ char: 'v' }),
    help: command_1.flags.help({ char: 'h' }),
    dev: command_1.flags.boolean({ char: 'd' }),
};
CreateRequestMoneyApp.args = [{ name: 'appName' }];
module.exports = CreateRequestMoneyApp;
