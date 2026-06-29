const LICENSE_KEY = "toolai_license";
const SALT = "toolai_v1_2026";

export interface LicenseData {
  key: string;
  tier: string;
  txHash: string;
  chain: string;
  activatedAt: string;
  expiresAt: string;
}

function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(input)).then((buf) => {
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

export async function generateLicenseKey(txHash: string, tier: string): Promise<string> {
  const hash = await sha256(txHash + SALT);
  const segments = [
    hash.slice(0, 4).toUpperCase(),
    hash.slice(4, 8).toUpperCase(),
    hash.slice(8, 12).toUpperCase(),
    hash.slice(12, 16).toUpperCase(),
  ];
  return `TOOLAI-${segments.join("-")}`;
}

export async function activateLicense(
  txHash: string,
  tier: string,
  chain: string
): Promise<LicenseData | null> {
  const key = await generateLicenseKey(txHash, tier);
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 30);

  const data: LicenseData = {
    key,
    tier,
    txHash,
    chain,
    activatedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  localStorage.setItem(LICENSE_KEY, JSON.stringify(data));
  localStorage.setItem("toolai_tier", tier);
  return data;
}

export function getLicense(): LicenseData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LICENSE_KEY);
  if (!raw) return null;
  try {
    const data: LicenseData = JSON.parse(raw);
    if (new Date(data.expiresAt) < new Date()) {
      localStorage.removeItem(LICENSE_KEY);
      localStorage.setItem("toolai_tier", "free");
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function clearLicense() {
  localStorage.removeItem(LICENSE_KEY);
  localStorage.setItem("toolai_tier", "free");
}

export function isLicenseValid(): boolean {
  return getLicense() !== null;
}
