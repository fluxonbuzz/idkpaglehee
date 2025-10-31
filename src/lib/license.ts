import crypto from 'crypto';

type LicenseClaims = {
  exp: number; // unix seconds
  plan?: string;
  device?: string; // optional device fingerprint
};

// Simple base64url helpers
function b64urlEncode(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function b64urlDecode(input: string): Buffer {
  const pad = 4 - (input.length % 4);
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/') + (pad < 4 ? '='.repeat(pad) : '');
  return Buffer.from(normalized, 'base64');
}

function hmacSha256(key: string, data: string): string {
  return b64urlEncode(crypto.createHmac('sha256', key).update(data).digest());
}

export function signSessionCookie(claims: LicenseClaims, secret: string): string {
  const header = { alg: 'HS256', typ: 'LJWT' };
  const headerB64 = b64urlEncode(JSON.stringify(header));
  const payloadB64 = b64urlEncode(JSON.stringify(claims));
  const toSign = `${headerB64}.${payloadB64}`;
  const sig = hmacSha256(secret, toSign);
  return `${toSign}.${sig}`;
}

export function verifySessionCookie(token: string, secret: string): { valid: boolean; claims?: LicenseClaims } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    const [headerB64, payloadB64, sig] = parts;
    const expected = hmacSha256(secret, `${headerB64}.${payloadB64}`);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return { valid: false };
    }
    const claims = JSON.parse(b64urlDecode(payloadB64).toString('utf8')) as LicenseClaims;
    const now = Math.floor(Date.now() / 1000);
    if (typeof claims.exp !== 'number' || claims.exp <= now) return { valid: false };
    return { valid: true, claims };
  } catch {
    return { valid: false };
  }
}

// License key verification: HMAC-signed payload string "payload.signature" where
// payload is base64url({ exp, plan?, device? }) and signature = HMAC_SHA256(LICENSE_SIGNING_KEY, payload)
export function verifyLicenseKey(key: string, signingSecret: string, deviceId?: string): { valid: boolean; claims?: LicenseClaims } {
  try {
    const [payloadB64, sig] = key.split('.');
    if (!payloadB64 || !sig) return { valid: false };
    const expected = hmacSha256(signingSecret, payloadB64);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return { valid: false };
    }
    const claims = JSON.parse(b64urlDecode(payloadB64).toString('utf8')) as LicenseClaims;
    const now = Math.floor(Date.now() / 1000);
    if (typeof claims.exp !== 'number' || claims.exp <= now) return { valid: false };
    if (claims.device && deviceId && claims.device !== deviceId) return { valid: false };
    return { valid: true, claims };
  } catch {
    return { valid: false };
  }
}

export type { LicenseClaims };


