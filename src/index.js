const WebSocket = require("ws");
const { exec } = require("child_process");

const wss = new WebSocket.Server({ port: 4000 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const command = message.toString();
    exec(command, (error, stdout, stderr) => {
      if (error) {
        ws.send(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        ws.send(`Stderr: ${stderr}`);
        return;
      }
      ws.send(stdout);
    });
  });

  ws.send("Connected to backend. Enter your commands.\n");
});
