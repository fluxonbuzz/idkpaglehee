// pages/api/memberships.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const membershipDataPath = path.join(process.cwd(), 'memberships.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Read membership data
    const data = JSON.parse(fs.readFileSync(membershipDataPath, 'utf-8'));
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    // Update membership data
    const { action, key, tier, ip, adminPassword } = req.body;
    const data = JSON.parse(fs.readFileSync(membershipDataPath, 'utf-8'));

    if (action === 'generateKey') {
      if (adminPassword !== data.settings.adminPassword) {
        return res.status(401).json({ error: 'Invalid admin password' });
      }

      const newKey = `SX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      data.keys[newKey] = {
        tier,
        used: false,
        generatedBy: 'admin',
        generatedAt: new Date().toISOString()
      };

      fs.writeFileSync(membershipDataPath, JSON.stringify(data, null, 2));
      return res.status(200).json({ key: newKey });
    }

    if (action === 'activate') {
      if (!data.keys[key] || data.keys[key].used) {
        return res.status(400).json({ error: 'Invalid or used key' });
      }

      if (data.keys[key].tier !== tier) {
        return res.status(400).json({ error: 'Key does not match selected tier' });
      }

      // Mark key as used
      data.keys[key].used = true;
      data.keys[key].ip = ip;

      // Create membership
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      data.members[ip] = {
        tier,
        activatedAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        keyUsed: key
      };

      fs.writeFileSync(membershipDataPath, JSON.stringify(data, null, 2));
      return res.status(200).json({ success: true });
    }

    res.status(400).json({ error: 'Invalid action' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
