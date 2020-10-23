const Generator = require('yeoman-generator');
const emoji = require('node-emoji');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args,opts);
    }

    initializing() {

    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "package",
                message: "Your project name",
                default: this.appname
            },
            {
                type: "input",
                name: "title",
                message: "Your website title",
                default: this.appname
            },
            {
                type: "input",
                name: "title",
                message: "Docker tag",
                default: this.appname+":latest"
            },
            // {
            //     type: "list",
            //     name: "style",
            //     message: "What styling would you like to use",
            //     default: "scss",
            //     store: true,
            //     choices: [
            //         "css",
            //         "scss"
            //     ]
            // }
        ])
    }

    configuring() {

    }

    default() {

    }

    writing() {
        if (this.abort) {
            return;
        }

        this.fs.copyTpl(
            this.templatePath('src/index.html'),
            this.destinationPath('src/index.html'),
            {title: this.answers.title}
        );
        this.fs.copyTpl(
            this.templatePath('assets/react_logo.png'),
            this.destinationPath('assets/react_logo.png')
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            {package: this.answers.package, docker: this.answers.dockertag}
        )
        this.fs.copy(
            this.templatePath('src/index.tsx'),
            this.destinationPath('src/index.tsx')
        );
        this.fs.copy(
            this.templatePath('src/App.tsx'),
            this.destinationPath('src/App.tsx')
        );
        this.fs.copy(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json')
        );
        this.fs.copy(
            this.templatePath('types/index.d.ts'),
            this.destinationPath('types/index.d.ts')
        );
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('src/globals.scss'),
            this.destinationPath('src/globals.'+this.answers.style)
        );
    }

    install() { 
        if (this.abort) {
            return;
        }
        this.yarnInstall(['parcel','react','react-dom','@types/react','@types/react-dom','@lucemans/logger']);
    }

    end() {
        console.log('\n'.repeat(5));
        console.log('\x1b[2m' + '-'.repeat(60)+"\x1b[0m");
        console.log('');
        console.log('\x1b[36mWelcome to your brand new project! '+emoji.get('rocket')+emoji.get('sparkles'));
        console.log('');
        console.log('\x1b[0m   To serve your website');
        console.log('\x1b[33m      $ yarn start');
        console.log('');
        console.log('\x1b[0m   To compile to sources');
        console.log('\x1b[33m      $ yarn build');
        console.log('\n');
        console.log('\x1b[0m\x1b[33m\x1b[7m ~ Luc ')
        console.log('\n');
    }
}

