import React from 'react';
import { Composition } from 'remotion';
import { MyComposition, myCompSchema } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EconomicsVideo"
        component={MyComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          title1: "অর্থনীতি ১.১",
          title1Color: "#ffffff",
          title2: "মুদ্রাস্ফীতি কী?",
          title2Color: "#ffd700",
          finalText: "SUBSCRIBE",
          logoColor: "#fdbb2d"
        }}
      />
    </>
  );
};