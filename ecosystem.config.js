require('dotenv').config();

module.exports = {
    apps: [
        {
            name: 'api-feranet',
            port: process.env.APP_PORT,
            script: 'node ./bin/www',
            args: 'start'
        }
    ],
    deploy: {
        production: {
            "host": process.env.SSH_HOST,
            "path": process.env.SSH_PATH,
            "ref": "origin/master",
            "repo": "https://github.com/Fl0wyn/api.feranet.fr.git",
            "post-deploy": "yarn && pm2 startOrRestart ecosystem.config.js"
        }
    }
}