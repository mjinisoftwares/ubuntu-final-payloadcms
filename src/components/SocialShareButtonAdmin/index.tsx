'use client'

import React from 'react'

export const SocialShareButtonAdmin: React.FC = () => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
        Quick Actions
      </label>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              navigator.clipboard?.writeText(window.location.href)
              alert('Service URL copied to clipboard!')
            }
          }}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            borderRadius: '4px',
            border: '1px solid var(--theme-elevation-200)',
            background: 'var(--theme-elevation-100)',
            cursor: 'pointer',
          }}
        >
          📋 Copy Page URL
        </button>
      </div>
    </div>
  )
}

export default SocialShareButtonAdmin
