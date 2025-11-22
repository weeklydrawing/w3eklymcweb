export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

  const body = req.body;

  const embed = {
    embeds: [
      {
        title: `${body.type} Application`,
        color: 0x00aaff,
        fields: Object.entries(body).map(([key, value]) => ({
          name: key,
          value: String(value)
        }))
      }
    ]
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send webhook" });
  }
}
