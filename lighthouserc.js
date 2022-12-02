module.exports = {
  ci: {
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https:lighthouse.mcsynergy.nl',
      token: '99089327-fb55-4aba-ba07-b40af2ded973',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};