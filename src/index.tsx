import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player } from '@remotion/player';
import { MyComposition } from './Composition';
import './style.css'; // আমরা নিচে স্টাইল বানাব

const App = () => {
  // এডিটর স্টেট (ডিফল্ট ভ্যালু)
  const [props, setProps] = useState({
    title1: "অর্থনীতি ১.১",
    title1Color: "#ffffff",
    title2: "মুদ্রাস্ফীতি কী?",
    title2Color: "#ffd700",
    finalText: "SUBSCRIBE",
    logoColor: "#fdbb2d"
  });

  // ইনপুট হ্যান্ডেলার
  const handleChange = (key: string, value: string) => {
    setProps(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="editor-container">
      {/* বাম পাশ: ভিডিও প্লেয়ার */}
      <div className="player-section">
        <Player
          component={MyComposition}
          inputProps={props}
          durationInFrames={300}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '16/9',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
          }}
          controls
          autoPlay
          loop
        />
      </div>

      {/* ডান পাশ: কন্ট্রোল প্যানেল */}
      <div className="controls-section">
        <h2>Econ Editor 🎥</h2>
        
        <div className="input-group">
          <label>Main Title</label>
          <input type="text" value={props.title1} onChange={(e) => handleChange('title1', e.target.value)} />
        </div>
        
        <div className="input-group">
          <label>Title Color</label>
          <div style={{display:'flex', gap:'5px'}}>
            <input type="color" value={props.title1Color} onChange={(e) => handleChange('title1Color', e.target.value)} />
            <span>{props.title1Color}</span>
          </div>
        </div>

        <div className="input-group">
          <label>Subtitle</label>
          <input type="text" value={props.title2} onChange={(e) => handleChange('title2', e.target.value)} />
        </div>

        <div className="input-group">
          <label>Subtitle Color</label>
          <div style={{display:'flex', gap:'5px'}}>
             <input type="color" value={props.title2Color} onChange={(e) => handleChange('title2Color', e.target.value)} />
             <span>{props.title2Color}</span>
          </div>
        </div>

        <div className="input-group">
          <label>End Text</label>
          <input type="text" value={props.finalText} onChange={(e) => handleChange('finalText', e.target.value)} />
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}