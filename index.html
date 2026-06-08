export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

    const header = ['번호', '추출텍스트', '메모', '날짜'];
    const rows = data.map(row => [
      row.id,
      `"${(row.extracted_text || '').replace(/"/g, '""')}"`,
      `"${(row.memo || '').replace(/"/g, '""')}"`,
      new Date(row.created_at).toLocaleString('ko-KR')
    ]);

    const csv = '\uFEFF' + [header, ...rows].map(r => r.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="work_logs.csv"');
    return res.status(200).send(csv);
  } catch (err) {
    return res.status(500).json({ error: '내보내기 오류: ' + err.message });
  }
}
