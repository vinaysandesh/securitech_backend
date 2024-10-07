const CREATE_TABLE_USERS =`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`
const CREATE_TABLE_LOGS = `CREATE TABLE logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   
    id_type TEXT NOT NULL,                 
    issue_name TEXT NOT NULL,             
    issue_type TEXT NOT NULL,              
    issue_priority TEXT NOT NULL,          
    issue_description TEXT NOT NULL,       
    issue_brief_description TEXT NOT NULL,  
    issue_resolution TEXT NOT NULL,         
    issue_url TEXT,                        
    assigned_to TEXT,                     
    status TEXT NOT NULL,                  
    host TEXT NOT NULL,                    
    ip TEXT NOT NULL,                      
    scan_date TEXT NOT NULL,               
    tool TEXT NOT NULL,
    occurrences INT DEFAULT 1,
    UNIQUE(issue_name, host)  -- Unique constraint for issue_name and host
);
`
module.exports ={
    CREATE_TABLE_USERS,
    CREATE_TABLE_LOGS
}