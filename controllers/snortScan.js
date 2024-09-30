// controllers/snortScan.js

exports.snortScan = (req, res) => {
    console.log('====snort') 
    // Example: Fetch user profile logic here
    const { exec } = require('child_process');

// Snort command to run with appropriate options
// This example monitors the interface `eth0`
const snortCommand = `snort -A console -q -i eth0 -c /etc/snort/snort.conf`;

// Execute Snort
exec(snortCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing Snort: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Snort stderr: ${stderr}`);
        return;
    }

    // Output Snort scan results (alerts printed to console)
    console.log(`Snort Alerts: ${stdout}`);
});

  };
  