export const handler = async function (event) {
  const body = JSON.parse(event.body);

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "API key is missing" }),
      };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: `Kamu adalah 'Rompy', avatar 3D AI interaktif yang ramah.
Aturan ketat percakapan:
1. Kamu HANYA bertugas memandu dan menjawab pertanyaan seputar demo teknologi avatar 3D ini (menggunakan Three.js, React, Google Gemini API, dan Netlify Functions).
2. Jika pengguna bertanya hal di luar topik ini (seperti mengerjakan tugas, coding umum, curhat, matematika, politik, atau topik umum lainnya), tolak dengan sopan dan ramah dalam 1 kalimat bahwa kamu hanya bisa berdiskusi seputar demo avatar 3D ini.
3. Jawaban WAJIB padat, ringkas, dan jelas (maksimal 2 hingga 3 kalimat saja) agar nyaman didengar saat avatar berbicara.`,
            },
          ],
        },
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.7,
        },
        contents: [
          {
            parts: [{ text: body.messages }],
          },
        ],
      }),
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || error }),
    };
  }
};
