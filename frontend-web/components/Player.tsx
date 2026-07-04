import React from 'react';

type Props = { src?: string };

export default function Player({ src }: Props) {
  const audioSrc = src || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 12, border: '1px solid #eee' }}>
      <h3>پلیر نمونه</h3>
      <audio controls style={{ width: '100%' }} src={audioSrc} />
    </div>
  );
}
