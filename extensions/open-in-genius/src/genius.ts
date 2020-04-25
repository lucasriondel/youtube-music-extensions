import queryString from 'query-string';

interface IMeta {
  status: number;
}

interface IStats {
  unreviewed_annotations: number;
  concurrents: number;
  hot: boolean;
  pageviews?: number;
}

interface IPrimaryArtist {
  api_path: string;
  header_image_url: string;
  id: number;
  image_url: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  url: string;
  iq?: number;
}

interface IResult {
  annotation_count: number;
  api_path: string;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  pyongs_count?: number;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  stats: IStats;
  title: string;
  title_with_featured: string;
  url: string;
  primary_artist: IPrimaryArtist;
}

interface IHit {
  highlights: any[];
  index: string;
  type: string;
  result: IResult;
}

interface IResponse {
  hits: IHit[];
}

export interface ISearchQueryResult {
  meta: IMeta;
  response: IResponse;
}

const apiUrl = 'https://api.genius.com';

const search = async (value: string) => {
  const qs = queryString.stringify({
    q: value,
    access_token: process.env.GENIUS_ACCESS_TOKEN,
  });
  const response = await fetch(`${apiUrl}/search?${qs}`, {
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
    // },
  });

  const jsonResponse = (await response.json()) as ISearchQueryResult;
  return jsonResponse;
};

export default {
  search,
};
