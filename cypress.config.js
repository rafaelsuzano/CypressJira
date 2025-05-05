const { defineConfig } = require('cypress');
const { configureXrayPlugin } = require('cypress-xray-plugin');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
     // console.log('Variáveis de ambiente:', {
        //XRAY_CLIENT_ID: process.env.XRAY_CLIENT_ID,
        //XRAY_CLIENT_SECRET: process.env.XRAY_CLIENT_SECRET,
        //JIRA_USERNAME: process.env.JIRA_USERNAME,
       // JIRA_API_TOKEN: process.env.JIRA_API_TOKEN,
      //});

      await configureXrayPlugin(on, config, {
        jira: {
          projectKey: 'AW',
          url: 'https://superbid.atlassian.net',
          attachVideos: true,

          fields: {
            summary: 'Resumo do Teste',
            description: 'Descrição detalhada',
            labels: ['automated', 'regression'],
          },

          
          cloud: true,
          username: process.env.JIRA_USERNAME,
          apiToken: process.env.JIRA_API_TOKEN,
        },
        xray: {
          uploadResults: true,
          cloud: true,
          clientId: process.env.XRAY_CLIENT_ID,
          clientSecret: process.env.XRAY_CLIENT_SECRET,
        },
      });

      return config;
    },
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
  },
});


