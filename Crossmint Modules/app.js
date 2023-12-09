const clientSecret = '$CROSSMINT_API_KEY', projectId = '$CROSSMINT_PROJECT_ID';

fetch('https://staging.crossmint.com/api/2022-06-09/collections/default/nfts', {
  method: 'POST',
  headers: {
    'x-client-secret': clientSecret,
    'x-project-id': projectId,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    metadata: {
      name: 'Proof of Attendance',
      image: 'https://www.example.com/assets/thanks_for_attending.png',
      description: "Proof of Attendance to ACME Inc's Tech Event",
    },
    recipient: 'email:john.doe@acme.com:polygon',
  }),
}).then((res) => res.json()).then(console.log).catch(console.error);
