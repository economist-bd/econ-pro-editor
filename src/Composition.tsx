import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from 'zod'; 

const { fontFamily } = loadFont();

export const myCompSchema = z.object({
  title1: z.string(),
  title1Color: z.string(),
  title2: z.string(),
  title2Color: z.string(),
  finalText: z.string(),
  logoColor: z.string(),
});

const ProTitle = ({ title, color, delay, type, fontSize = 100 }: any) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame: frame - delay,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = spring({
    fps,
    frame: frame - delay,
    config: { damping: 200 },
  });

  let style: React.CSSProperties = {
    fontFamily,
    fontWeight: 900,
    fontSize: fontSize,
    color: color,
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    top: '40%',
    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
  };

  if (type === 'pop') {
    style.transform = `scale(${entrance})`;
  } else if (type === 'slide') {
    style.transform = `translateY(${100 - (entrance * 100)}px)`;
    style.opacity = opacity;
  } else {
    style.opacity = opacity;
  }

  return <div style={style}>{title}</div>;
};

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
  title1,
  title1Color,
  title2,
  title2Color,
  finalText,
  logoColor
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#111' }}>
      <Sequence from={0}>
         <AbsoluteFill style={{ background: `linear-gradient(to bottom right, #1a2a6c, #b21f1f, ${logoColor})` }} />
      </Sequence>
      <Sequence from={10} durationInFrames={90}>
        <ProTitle title={title1} color={title1Color} delay={0} type="pop" />
      </Sequence>
      <Sequence from={60} durationInFrames={120}>
         <div style={{ position:'absolute', bottom: 100, left: 100, width: '100%' }}>
            <ProTitle title={title2} color={title2Color} delay={0} type="slide" />
         </div>
      </Sequence>
      <Sequence from={140}>
         <div style={{ 
           fontSize: 150, fontFamily, fontWeight:'bold', color:'white', textAlign:'center', width:'100%', top:'35%', position:'absolute',
           mixBlendMode: 'overlay' 
         }}>
           {finalText}
         </div>
      </Sequence>
    </AbsoluteFill>
  );
};