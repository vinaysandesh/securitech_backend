const insertUser = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
const insertLogs = `INSERT INTO logs (
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
VALUES (
   ?,?,?,?,?,?,?,?,?,?,?,?,?,? 
);
`
module.exports = {
    insertUser,
    insertLogs
}