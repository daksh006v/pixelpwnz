import { useState } from 'react';
import { Shield, Check, AlertTriangle } from 'lucide-react';
import useUiStore from '../store/uiStore';

export default function PrivacyModal() {
  const { privacyAccepted, acceptPrivacy } = useUiStore();
  const [checked, setChecked] = useState(false);

  if (privacyAccepted) return null;

  return (
    <div className="modal-overlay" id="privacy-modal">
      <div className="modal-card" style={{ maxWidth: 560 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Shield size={24} color="#fff" />
          </div>
          <div>
            <h2 className="text-h2" style={{ color: 'var(--color-text)' }}>
              Privacy & Ethics Agreement
            </h2>
            <p className="text-small" style={{ color: 'var(--color-text-secondary)', marginTop: 2 }}>
              Please read and accept before continuing
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 20 }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text)' }}>Data Privacy:</strong> Your uploaded WhatsApp chat file is processed in real-time and <strong style={{ color: 'var(--color-text)' }}>never stored permanently</strong> on our servers. All data is deleted immediately after processing.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text)' }}>Consent:</strong> You confirm that you have the right to upload this chat data and that the other participants' privacy is respected.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text)' }}>Ethical Use:</strong> The AI clone is for personal use only. You will not use it to impersonate someone else, spread misinformation, or deceive others.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text)' }}>Session-Based:</strong> Your session data (including the AI model's memory) is temporary and will be purged when the session expires or you click "Clear Session."
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 20 }} />

        {/* Checkbox */}
        <label
          className="checkbox-container"
          style={{ marginBottom: 24, cursor: 'pointer' }}
          id="privacy-checkbox"
        >
          <div
            className={`checkbox ${checked ? 'checkbox--checked' : ''}`}
            onClick={() => setChecked(!checked)}
          >
            {checked && <Check size={14} color="#fff" strokeWidth={3} />}
          </div>
          <span className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
            I have read and agree to the privacy and ethics guidelines above. I understand that my data is processed temporarily and will not be stored.
          </span>
        </label>

        {/* CTA */}
        <button
          className="btn btn-primary"
          disabled={!checked}
          onClick={acceptPrivacy}
          style={{ width: '100%' }}
          id="privacy-accept-btn"
        >
          Continue to Signet
        </button>
      </div>
    </div>
  );
}
