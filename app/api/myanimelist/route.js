import { NextResponse } from "next/server";

const ANILIST_API_URL = "https://graphql.anilist.co";

const query = `
  query {
    Viewer {
      id
      name
      animeList: mediaListCollection(type: ANIME, status_in: [CURRENT, COMPLETED, PLANNING]) {
        lists {
          name
          entries {
            media {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
              }
              format
              status
            }
          }
        }
      }
    }
  }
`;

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const access_token = authHeader?.replace("Bearer ", "");

  if (!access_token) {
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }

  try {
    const res = await fetch(ANILIST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: result }, { status: res.status });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Failed to fetch anime list:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const { access_token } = await req.json();

  if (!access_token) {
    return NextResponse.json({ error: "Missing access token" }, { status: 400 });
  }

  try {
    const res = await fetch(ANILIST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: result }, { status: res.status });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Failed to fetch user's anime list:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
