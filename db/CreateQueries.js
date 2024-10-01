const CREATE_TABLE_USERS =`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`
const CREATE_TABLE_LOGS = `CREATE TABLE logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-increment ID for each log entry
    id_type TEXT NOT NULL,                 -- Incident ID like 'INC-001'
    issue_name TEXT NOT NULL,              -- Name of the issue
    issue_type TEXT NOT NULL,              -- Type of issue (e.g., 'Vulnerability')
    issue_priority TEXT NOT NULL,          -- Priority level of the issue
    issue_description TEXT NOT NULL,       -- Detailed description of the issue
    issue_brief_description TEXT NOT NULL, -- Brief description of the issue
    issue_resolution TEXT NOT NULL,        -- Resolution steps for the issue
    issue_url TEXT,                        -- URL link for more information
    assigned_to TEXT,                      -- Person assigned to handle the issue
    status TEXT NOT NULL,                  -- Status of the issue (e.g., 'Open')
    host TEXT NOT NULL,                    -- Host name (e.g., 'scanme.nmap.org')
    ip TEXT NOT NULL,                      -- IP address of the host
    scan_date TEXT NOT NULL,               -- Date of the scan (in 'YYYY-MM-DD' format)
    tool TEXT NOT NULL                     -- Tool used for the scan (e.g., 'nmap')
);
`
module.exports ={
    CREATE_TABLE_USERS,
    CREATE_TABLE_LOGS
}