const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// VirusTotal API Key (get it from your account)
const API_KEY = 'b11d4ef2b2a1b4ef66c909daea661269637b15d16d119c100be8525682c7a0a3';

// Function to upload file to VirusTotal
const scanFileWithVirusTotal = async (filePath) => {
  try {
    const form = new FormData();
    const fileStream = fs.createReadStream(filePath);

    // Append the file and API key to form data
    form.append('file', fileStream);
    form.append('apikey', API_KEY);

    // Make the request to VirusTotal's file scan API
    const response = await axios.post('https://www.virustotal.com/vtapi/v2/file/scan', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    // The response will contain a scan_id which you can use to check the results
    const { scan_id } = response.data;
    console.log('File uploaded for scanning. Scan ID:', scan_id);

    // Use the scan ID to get the scan report
    const report = await getScanReport(scan_id);
    console.log('Scan Report:', report);
  } catch (error) {
    console.error('Error scanning file with VirusTotal:', error);
  }
};

// Function to check the scan report using the scan_id
const getScanReport = async (scan_id) => {
  try {
    const response = await axios.get('https://www.virustotal.com/vtapi/v2/file/report', {
      params: {
        apikey: API_KEY,
        resource: scan_id,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving scan report:', error);
  }
};

// // Example usage
// const filePath = path.join(__dirname, 'uploads', 'file-to-scan.zip');
// scanFileWithVirusTotal(filePath);

module.exports= scanFileWithVirusTotal;