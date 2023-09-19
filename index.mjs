#!/usr/bin/env node
import inquirer from 'inquirer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: `${dirname(fileURLToPath(import.meta.url))}/.env` });

class VpsManager {
    constructor() {
        this.vpsNames = process.env.VPS_NAMES.split(',');
        this.initChoices();
    }

    initChoices() {
        this.choices = {
            mainChoice: {
                type: 'list',
                name: 'data',
                message: 'What do you want to do:',
                choices: this.vpsNames,
            }
        }
    }

    async executeCommandWithOutput(command, args, shell = false) {
        return new Promise((resolve, reject) => {
            const spawnedProcess = spawn(command, args, { stdio: 'inherit', shell });
    
            spawnedProcess.on('close', (code) => {
                if (code === 0) {
                    console.log(`Process finished`);
                    resolve();
                } else {
                    reject(new Error(`Process exited with code: ${code}`));
                }
            });
        });
    }
    
    async run() {
        const { data } = await inquirer.prompt(this.choices.mainChoice);

        const ip = process.env[`${data.toUpperCase()}_IP`]
        const users = process.env[`${data.toUpperCase()}_USERS`].split(',');

        const { user } = await inquirer.prompt({
            type: 'list',
            name: 'user',
            message: 'Select user',
            choices: users,
        });

        this.executeCommandWithOutput('ssh', [`${user}@${ip}`]);
    }
}

const vpsManager = new VpsManager();
vpsManager.run();
