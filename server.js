import express from 'express';

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post('/discord', async (req, res) => {
  try {
    const { character_name, character_realm, items, comment } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items' });
    }

    const message = `New guild bank request from ${character_name} (${character_realm}) for ${items.join(', ')} to be used for ${comment}`;

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(process.env.PORT || 3000);
