import json
import re
from datetime import datetime
import sqlite3
import random
import sys

# Function to determine priority based on CVSS score
insert_logs_query = '''
    INSERT INTO logs ( 
    id_type,
    issue_name,
    issue_type,
    issue_priority,
    issue_description,
    issue_brief_description,
    issue_resolution,
    issue_url,
    assigned_to,
    status,
    host,
    ip,
    scan_date,
    tool
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(issue_name, host) DO UPDATE SET 
    occurrences = occurrences + 1;
'''
def determine_priority(cvss_score):
    if cvss_score > 8.5:
        return "High"
    elif cvss_score == 7:
        return "Medium"
    elif cvss_score > 6:
        return "Low"
    else:
        return "Info"

# Function to assign to appropriate personnel based on priority
def assign_personnel(issue_priority):
    if issue_priority == "High":
        return "Analyst"
    else:
        return "User"

# Function to parse the Nmap text output
def parse_nmap_txt(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    incidents = []
    current_port = None
    current_service = None
    incident_count = 1
    conn = sqlite3.connect('./db/data.db') 
    cursor = conn.cursor() 

# Execute the INSERT query with the provided values
 
    for line in lines:
        # Detect open ports and services
       
        port_match = re.match(r"(\d+\/tcp)\s+(\w+)\s+(\S+)", line)
        if port_match:
            current_port = port_match.group(1)
            current_service = port_match.group(3)

        # Detect vulnerabilities with CVE and URLs
        if "vulners" in line:
            vuln_data = line.strip().split("\t")
            if len(vuln_data) > 1:
                issue_name = vuln_data[1]
                url_match = re.search(r'(https?://\S+)', line)
                url = url_match.group(0) if url_match else "No URL"
                
                # Extract CVSS score from the line (if available)
                cvss_match = re.search(r'(\d+\.\d+)', line)
                cvss_score = float(cvss_match.group(0)) if cvss_match else 0.0

                issue_priority = determine_priority(cvss_score)
                assigned_to = assign_personnel(issue_priority)

                incident = {
                    "id_type": f"INC-{incident_count:03}",
                    "issue_name": issue_name,
                    "issue_type": "Vulnerability",
                    "issue_priority": issue_priority,
                    "issue_description": f"Vulnerability found in {current_service} on port {current_port}. CVSS score: {cvss_score}.",
                    "issue_brief_description": f"{current_service} vulnerability on port {current_port}.",
                    "issue_resolution": "Apply relevant patches or update the service.",
                    "issue_url": url,  # Storing the URL here
                    "assigned_to": assigned_to,
                    "status": "Open",
                    "tool":"nmap"
                    
                }
                
                print("ARGS=",sys.argv)
                data_dump = (
                    random.randint(1000, 100000),
                    issue_name,
                    "vulneribility",
                    issue_priority,
                    f"Vulnerability found in {current_service} on port {current_port}. CVSS score: {cvss_score}.",
                    f"{current_service} vulnerability on port {current_port}.",
                    "Apply relevant patches or update the service.",
                    url,
                    assigned_to,
                    "Open",
                    sys.argv[1],
                    "45.33.32.156",  # Example IP
                    datetime.now().strftime("%Y-%m-%d"),
                    "nmap",
                     
                )
                print("incident_count")
                cursor.execute(insert_logs_query, data_dump)
                conn.commit()

# Close the connection 
                print(incident_count)
                incidents.append(incident)
                incident_count += 1
                

    return incidents

# Function to save the parsed data to a JSON file
def save_to_json(incidents, output_file):
    data = {
         
        "incidents": incidents
    }
   
    
        # push to database
    # Save the JSON data to a file
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    
    print(f"Incidents saved to {output_file}")

# Example usage
nmap_txt_file = "output.txt"  # The Nmap text output file
json_output_file = "incidents.json"  # The JSON output file

# Parse the Nmap text output
incidents_data = parse_nmap_txt(nmap_txt_file)

# Save the parsed data to JSON
save_to_json(incidents_data, json_output_file)
