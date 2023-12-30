const { exec } = require('child_process');

const commands = [
  {
    name: 'Varico API',
    command: 'kiota generate -l typescript -c VaricoApiClientGenerated -d swagger-specs/varico.api.json -o src/app/core/api-client/generated/varico-api-client --co',
  }
];

async function runCommands() {
  for (const { command, name } of commands) {
    console.log('\x1b[90m' + 'Generating ' + name + ' Client...' + '\x1b[0m');
    await executeCommand(command).catch(() => {});
  }
}

function executeCommand(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout) => {
      if (error) {
        resolve({ error });
      } else if (stdout.startsWith('fail:')) {
        console.log('\x1b[31mError while generating\x1b[0m');
        process.exit(1);
      } else {
        resolve({ error: null });
      }
    });
  });
}

runCommands();