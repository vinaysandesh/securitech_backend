const getUserDetails = "SELECT id, username, email FROM users WHERE id = ?";
const getLogs = `
        SELECT 
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
        FROM 
            logs 
            ORDER BY scan_date DESC  -- Or you can use 'id' if you prefer
        LIMIT 10;
    `;
const get_group_by_tools = `SELECT tool, COUNT(*) AS count
FROM logs
GROUP BY tool;`
module.exports ={
    getUserDetails,
    getLogs,
    get_group_by_tools
}