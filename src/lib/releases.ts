import { parseArtifactName, parseChecksums, type ParsedArtifact } from "./artifacts";

/**
 * Release metadata comes straight from the GitHub Releases API. Nothing is
 * invented: if a repository has no published release, callers get `null`
 * and the UI says so instead of showing placeholder links.
 */

export interface DownloadAsset extends ParsedArtifact {
  name: string;
  url: string;
  size: number;
  sha256: string | null;
}

export interface ReleaseData {
  repo: string;
  version: string;
  tag: string;
  url: string;
  publishedAt: string | null;
  notes: string;
  assets: DownloadAsset[];
  checksumsUrl: string | null;
}

interface GhAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface GhRelease {
  tag_name: string;
  html_url: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  assets: GhAsset[];
}

export type Fetcher = (
  url: string,
  init?: RequestInit & { next?: { revalidate?: number } },
) => Promise<Response>;

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "waydlp-website",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

/** Convert a GitHub release plus its checksum file into our model. */
export function toReleaseData(repo: string, rel: GhRelease, checksumsText: string | null): ReleaseData {
  const sums = checksumsText ? parseChecksums(checksumsText) : new Map<string, string>();
  const assets: DownloadAsset[] = [];
  for (const a of rel.assets) {
    const parsed = parseArtifactName(a.name);
    if (!parsed) continue;
    assets.push({
      ...parsed,
      name: a.name,
      url: a.browser_download_url,
      size: a.size,
      sha256: sums.get(a.name) ?? null,
    });
  }
  const checksums = rel.assets.find((a) => a.name === "SHA256SUMS.txt");
  return {
    repo,
    version: rel.tag_name.replace(/^v/, ""),
    tag: rel.tag_name,
    url: rel.html_url,
    publishedAt: rel.published_at,
    notes: rel.body ?? "",
    assets,
    checksumsUrl: checksums?.browser_download_url ?? null,
  };
}

/** Latest stable release of a repository, or null if none is published or GitHub is unreachable. */
export async function getLatestRelease(repo: string, fetcher: Fetcher = fetch): Promise<ReleaseData | null> {
  try {
    const r = await fetcher(`${API}/repos/${repo}/releases/latest`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!r.ok) return null;
    const rel = (await r.json()) as GhRelease;
    if (rel.draft || rel.prerelease) return null;
    let sums: string | null = null;
    const sumsAsset = rel.assets.find((a) => a.name === "SHA256SUMS.txt");
    if (sumsAsset) {
      const s = await fetcher(sumsAsset.browser_download_url, { next: { revalidate: REVALIDATE_SECONDS } });
      if (s.ok) sums = await s.text();
    }
    return toReleaseData(repo, rel, sums);
  } catch {
    return null;
  }
}

/** All published (non-draft) releases, newest first, for the changelog. */
export async function getReleases(repo: string, fetcher: Fetcher = fetch): Promise<GhRelease[]> {
  try {
    const r = await fetcher(`${API}/repos/${repo}/releases?per_page=30`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!r.ok) return [];
    const list = (await r.json()) as GhRelease[];
    return list.filter((x) => !x.draft);
  } catch {
    return [];
  }
}
