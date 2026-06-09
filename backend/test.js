async function runCode() {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      language: "javascript",
      version: "15.10.0", // optional, but good to specify
      files: [
        {
          name: "main.js",
          content: "console.log('hello')"
        }
      ]
    })
  });

  const data = await response.json();
  console.log("Full response:", data);          // see everything
  console.log("Output:", data.run.stdout);      // actual program output
}

runCode().catch(err => console.error("Error:", err));
