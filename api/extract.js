export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/work_logs?select=*&order=created_at.desc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      }
    });

    const data = await response.json();

    const header = '번호,추출텍스트,메모,날짜';
    const rows = data.map(row => {
      const text = (row.extracted_text || '').replace(/"/g, '""');
      const memo = (row.memo || '').replace(/"/g, '""');
      const date = new Date(row.created_at).toLocaleString('ko-KR');
      return `${row.id},"${text}","${memo}","${date}"`;
    });

    const csv = '\uFEFF' + [header, ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="work_logs.csv"');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(csv);
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: '내보내기 오류: ' + err.message });
  }
}
