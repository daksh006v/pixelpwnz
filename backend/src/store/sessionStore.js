import config from '../config.js';

import Session from './Session.js';

export async function createSession(sessionId, data) {
  await Session.create({
    session_id: sessionId,
    ...data,
  });
}

export async function getSession(sessionId) {
  const session = await Session.findOne({ session_id: sessionId });
  return session ? session.toObject() : null;
}

export async function deleteSession(sessionId) {
  const result = await Session.deleteOne({ session_id: sessionId });
  return result.deletedCount > 0;
}

// Cleanup functions are no longer needed because Mongoose TTL indexes handle expiry.
// We keep empty functions so tests and imports don't break immediately.
export function startCleanup() {}
export function stopCleanup() {}

export async function listSessions() {
  const sessions = await Session.find()
    .select('-pairs') // Do not load massive pair arrays into memory
    .sort({ created_at: -1 });
  
  return sessions.map(s => s.toObject());
}

export async function updateSession(sessionId, updates) {
  const allowedFields = ['label', 'temperature'];
  const safeUpdates = {};
  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      safeUpdates[field] = updates[field];
    }
  }

  const session = await Session.findOneAndUpdate(
    { session_id: sessionId },
    { $set: safeUpdates },
    { new: true }
  );
  
  return session ? session.toObject() : null;
}

export async function clearAll() {
  await Session.deleteMany({});
}
