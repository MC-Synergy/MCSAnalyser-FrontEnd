module.exports = {
  ci: {
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https:lighthouse.mcsynergy.nl',
      token: LHCI_TOKEN,
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};