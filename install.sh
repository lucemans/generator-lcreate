#!/bin/bash

sudo apt update

if ! type npm >/dev/null 2>&1
then
    echo Installing NPM
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion    
    nvm -v
    nvm install v12.18.4
fi
source ~/.bashrc

if ! type yarn >/dev/null 2>&1
then
    npm i --global yarn
    yarn -v
fi
source ~/.bashrc

if ! type yo >/dev/null 2>&1
then
    npm i -g yo
    yo -v
fi
source ~/.bashrc

if ! type git >/dev/null 2>&1
then
    sudo apt install git
    git --version
fi

source ~/.bashrc

sudo rm -rf /luc/generator-lcreate
sudo mkdir -p /luc/generator-lcreate
cd /luc/generator-lcreate
sudo git clone https://github.com/lucemans/generator-lcreate .
sudo yarn
sudo yarn link

echo -e ""
echo -e ""
echo -e ""
echo -e ""
echo -e ""
echo -e "\x1b[2m------------------------------------------------------------\x1b[0m"
echo -e ""
echo -e "\x1b[36mCongratz you have installed LCREATE! "
echo -e "\x1b[0m\x1b[22mYou should know also have access to \x1b[0m\x1b[92m[NPM] [YARN] [YEOMAN] [NVM] [GIT]"
echo -e ""
echo -e "\x1b[0m   Start your first project using"
echo -e "\x1b[33m      $ yo lcreate\x1b[0m"
echo -e ""
echo -e ""
echo -e "\x1b[0m\x1b[33m\x1b[7m ~ Luc "
echo -e "\x1b[0m"