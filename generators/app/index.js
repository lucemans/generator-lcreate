const Generator = require('yeoman-generator');
const emoji = require('node-emoji');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {

    }

    async prompting() {
        this.project = await this.prompt([
            {
                type: "list",
                name: "type",
                choices: [
                    { name: "react", value: "react" },
                    { name: "nodejs", value: "nodejs" }
                ],
                default: "react"
            }
        ]);

        if (this.project.type == "react") {
            this.answers = await this.prompt([
                {
                    type: "input",
                    name: "package",
                    message: "Your project name",
                    default: this.appname
                },
                {
                    type: "input",
                    name: "docker",
                    message: "Docker Package",
                    default: this.appname
                }
            ]);
        }
    }

    configuring() {
        if (this.abort) return;

        let copies = [];

        if (this.project.type == "react") {
            this.answers.package = this.answers.package.replace(/ /g, '');
            copies = [
                ['react/.gitignore', '.gitignore'],
                ['react/tsconfig.json', 'tsconfig.json'],
                ['react/.eslintrc.json', '.eslintrc.json'],
                ['react/.eslintignore', '.eslintignore'],
                ['react/.vscode/settings.json', '.vscode/settings.json'],
            ];
        }
        for (const entry of copies) {
            this.fs.copyTpl(this.templatePath(entry[0]), this.destinationPath(entry[1]), entry.length > 2 ? entry[2] : {});
        }
    }

    default() {

    }

    writing() {
        if (this.abort) return;

        let copies = [];

        if (this.project.type == "react") {
            copies = [
                ['react/src/index.html', 'src/index.html', { title: this.answers.package }],
                ['react/assets/react_logo.png', 'assets/react_logo.png'],
                ['react/package.json', 'package.json', { package: this.answers.package, docker: this.answers.dockertag }],
                ['react/src/index.tsx', 'src/index.tsx'],
                ['react/src/App.tsx', 'src/App.tsx'],
                ['react/types/index.d.ts', 'types/index.d.ts'],
                ['react/src/globals.scss', 'src/globals.scss'],
                ['react/Dockerfile', 'Dockerfile'],
            ];
        }
        for (const entry of copies) {
            this.fs.copyTpl(this.templatePath(entry[0]), this.destinationPath(entry[1]), entry.length > 2 ? entry[2] : {});
        }
    }

    install() {
        if (this.abort) return;

        if (this.project.type == "react") {
            this.yarnInstall(['@types/react', '@types/react-dom', 'typescript', 'eslint', 'eslint-plugin-react', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'], { 'dev': true })
            this.yarnInstall(['parcel', 'react', 'react-dom', '@lucemans/logger', 'sass']);
        }
    }

    end() {
        console.log('\n'.repeat(5));
        console.log('\x1b[2m' + '-'.repeat(60) + "\x1b[0m");
        console.log('');
        console.log('\x1b[36mWelcome to your brand new project! ' + emoji.get('rocket') + emoji.get('sparkles'));
        console.log('');
        console.log('\x1b[0m   To serve your website');
        console.log('\x1b[33m      $ yarn start');
        console.log('');
        console.log('\x1b[0m   To compile to sources');
        console.log('\x1b[33m      $ yarn build:bundle');
        console.log('\n');
        console.log('\x1b[0m\x1b[33m\x1b[7m ~ Luc ')
        console.log('\n');
    }
}

