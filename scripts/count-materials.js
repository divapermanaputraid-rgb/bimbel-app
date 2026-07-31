const fs = require('fs');
const sql = fs.readFileSync('supabase/migrations/039_seed_all_materials.sql', 'utf8');
const matches = sql.match(/\(\n\s*'([^']+)',/g);
const ids = matches.map(m => m.match(/'([^']+)'/)[1]);
const counts = {};
ids.forEach(id => {
  const subject = id.split('-').slice(0,2).join('-');
  counts[subject] = (counts[subject] || 0) + 1;
});
console.log(counts);
let total = 0;
for (const k in counts) total += counts[k];
console.log("Total:", total);
