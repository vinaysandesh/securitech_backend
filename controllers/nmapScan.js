// const runNmapScans = ()=>{
//     var nmap = require('node-nmap');
 
// nmap.nmapLocation = "nmap"; //default
 
// //    Accepts array or comma separated string of NMAP acceptable hosts
// var quickscan = new nmap.QuickScan('127.0.0.1 192.168.1.110', '-sn');
 
// quickscan.on('complete', function(data){
//   console.log(data);
// });

// quickscan.on('error', function(error){
//   console.log(error);
// });

// quickscan.startScan();
// }

// module.exports = runNmapScans

// Import the child_process module
const { exec } = require('child_process');
const path = require('path');
const parseXML = require('../utils/xmlParser');

const parseVulnersOutput=(nmapOutput )=> {
    const lines = nmapOutput.split('\n');
    const vulnersData = [];
    let currentPort = null;
    let currentService = null;

    lines.forEach(line => {
        const portMatch = line.match(/(\d+\/tcp)\s+open\s+(\w+)/);
        if (portMatch) {
            currentPort = portMatch[1];
            currentService = portMatch[2];
        }

        const vulnersMatch = line.match(/\|\s+(\S+):\s+([A-Za-z0-9-]+)\s+([\d.]+)\s+(\S+)/);
        if (vulnersMatch && currentPort && currentService) {
            const [_, cpe, code, riskValue, link] = vulnersMatch;
            let severity = 'unknown';

            // Determine severity based on risk value
            if (riskValue >= 9.0) {
                severity = 'Critical';
            } else if (riskValue >= 7.0) {
                severity = 'High';
            } else if (riskValue >= 4.0) {
                severity = 'Medium';
            } else if (riskValue > 0) {
                severity = 'Low';
            }

            vulnersData.push({
                port: currentPort,
                service: currentService,
                name: cpe,
                code: code,
                description: link,
                risk_value: riskValue,
                severity: severity
            });
        }
    });

    return vulnersData;
}
// Function to run Nmap scan
const runPythonNmap = ()=>{
const { spawn } = require('child_process');

// Define the Python script and arguments
const pythonScript = 'parseNmapOutput.py';
const args = ['1', '2', '3'];  // Arguments to pass to the script

// Spawn a child process to run the Python script
const pythonProcess = spawn('python', [pythonScript, ...args]);

// Handle output from the Python script
pythonProcess.stdout.on('data', (data) => {
    console.log(`Output: ${data.toString()}`);
});

// Handle error output from the Python script
pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data.toString()}`);
});

// Handle process exit
pythonProcess.on('exit', (code) => {
    console.log(`Python script exited with code: ${code}`);
});
}
const runNmapScans = (req,res) => {
    const currentDir = process.cwd(); 
    const nmapCommand =  `nmap -sV --script vulners --script-args mincvss=5 -oN C:/Users/vinay/Desktop/capstone/backend/output.txt scanme.nmap.com`;
    // const command = `nmap ${options} ${target}`;

    // Execute the command
    exec(nmapCommand,{cwd:"C:/Users/vinay/Desktop/capstone/backend"}, (error, stdout, stderr) => {
        if (error) {
           res.status(500).json({ success: false, message: error });

        }
        if (stderr) { 
            return;
        } 
        runPythonNmap()
         res.json({ success: true, data: "stdout" });
    }); 
};
 
// Export the function so it can be used in other modules
module.exports = runNmapScans
