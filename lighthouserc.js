module.exports = {
  ci: {
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse.mcsynergy.nl',
      token: '99089327-fb55-4aba-ba07-b40af2ded973',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    collect: {
      settings: { 
        hostname: "127.0.0.1"
      },
      url: [
        "http://127.0.0.1:4000"
      ],
      startServerCommand: "http-server ./build -p 4000 -g",
      startServerReadyPattern: "Available on",
      numberOfRuns: 1
    },
  },
};