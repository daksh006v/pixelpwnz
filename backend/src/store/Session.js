import mongoose from 'mongoose';
import config from '../config.js';

const sessionSchema = new mongoose.Schema({
  session_id: { type: String, required: true, unique: true, index: true },
  contact_name: { type: String, default: '' },
  userName: { type: String, default: '' },
  label: { type: String, default: null },
  pairs: { type: Array, default: [] },
  toneProfile: { type: Object, default: null },
  created_at: { type: Date, default: Date.now }
});

// Create a TTL index to automatically delete expired sessions
// config.session.ttl is in seconds.
sessionSchema.index({ created_at: 1 }, { expireAfterSeconds: config.session.ttl });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
