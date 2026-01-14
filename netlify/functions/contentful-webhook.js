exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPOSITORY; // e.g. owner/repo
    if (!token || !repo) {
      return { statusCode: 500, body: "Missing GitHub token or repository" };
    }

    const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        event_type: "contentful_publish",
        client_payload: {
          sys: payload?.sys || {},
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { statusCode: 500, body: `Failed to dispatch: ${text}` };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
