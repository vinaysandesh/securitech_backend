const fs = require('fs');
const xml2js = require('xml2js');
 

const parseXML = (xmlData) =>{ 
        fs.readFile("C:/Users/vinay/Desktop/capstone/backend/output.xml", 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
    
            // Parse XML data
            xml2js.parseString(data, (err, result) => {
                if (err) {
                    console.error("Error parsing XML:", err);
                    return;
                }
                console.log(result.nmaprun.host[0].ports[0].port)
                // Accessing multiple port entries
                const ports = result.nmaprun.host[0].ports;
    
               try{
                ports.forEach(port => {
                    const serviceInfo = port.service[0];
                    const vulnerabilitiesOutput = port.script[0].$.output; // Using the output from the script element
    
                    console.log(`Port ID: ${port.$.portid}`);
                    console.log(`Protocol: ${port.$.protocol}`);
                    console.log(`Service Name: ${serviceInfo.$.name}`);
                    console.log(`Service Product: ${serviceInfo.$.product}`);
                    console.log(`Service Version: ${serviceInfo.$.version}`);
    
                    // Process vulnerabilities output
                    console.log("Vulnerabilities Output:");
                    console.log(vulnerabilitiesOutput);
                    console.log('------------------------------');
                });
               }catch(e){
                console.log(e)
               }
            });
        });
    }; 

module.exports=parseXML