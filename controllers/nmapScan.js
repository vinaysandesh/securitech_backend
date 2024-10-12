const { exec } = require('child_process');
const path = require('path');
const parseXML = require('../utils/xmlParser');
 
// Function to run Nmap scan
const runPythonNmap = (target)=>{
const { spawn } = require('child_process');

// Define the Python script and arguments
const pythonScript = 'parseNmapOutput.py';
const args = [target];  // Arguments to pass to the script

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
const yup = require('yup')
const schema = yup.object().shape({
    target: yup.string().min(3).required(), 
  });
const runNmapScans =async (req,res) => {
    const currentDir = process.cwd();  
    console.log(req.body)
    try {
        
    // const command = `nmap ${options} ${target}`;
    
    // Execute the command
    await schema.validate(req.body);
    const nmapCommand =  `nmap -sV --script vulners --script-args mincvss=5 -oN output.txt ${req.body.target}`;
    exec(nmapCommand,{cwd:process.cwd()}, (error, stdout, stderr) => {
        if (error) {
           res.status(500).json({ success: false, message: error });

        }
        if (stderr) { 
            return;
        } 
        runPythonNmap(req.body.target)
         res.json({ success: true, data: "stdout" });
    }); 
      } catch (error) {
        res.status(400).send(error.message);
      }
    
};
 
// Export the function so it can be used in other modules
module.exports = runNmapScans
