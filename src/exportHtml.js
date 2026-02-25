// Generates a designed HTML string for trainees and courses export
export function generateExportHtml(trainees, courses) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Trainees and Courses</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f9fa; color: #222; margin: 0; padding: 2em; }
    h1, h2 { color: #2c3e50; }
    .section { margin-bottom: 2em; }
    table { border-collapse: collapse; width: 100%; background: #fff; box-shadow: 0 2px 8px #0001; }
    th, td { border: 1px solid #ddd; padding: 0.75em; text-align: left; }
    th { background: #2c3e50; color: #fff; }
    tr:nth-child(even) { background: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Exported Report</h1>
  <div class="section">
    <h2>Trainees</h2>
    <table>
      <thead>
        <tr><th>ID</th><th>First Name</th><th>Last Name</th></tr>
      </thead>
      <tbody>
        ${trainees.map((t) => `<tr><td>${t.id}</td><td>${t.firstName}</td><td>${t.lastName}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
  <div class="section">
    <h2>Courses</h2>
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Start Date</th><th>Participants</th></tr>
      </thead>
      <tbody>
        ${courses.map((c) => `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.startDate}</td><td>${c.participants?.length || 0}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>`;
}
