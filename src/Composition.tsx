import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { spring } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from 'zod'; // ইনপুট কন্ট্রোলের জন্য

const { fontFamily } = loadFont();

// ১. ইনপুট কন্ট্রোল স্কিমা (Control Panel Configuration)
export const myCompSchema = z.object({
  title1: z.string(),
  title1Color: z.string(), // কালার পিকার আসবে
  title2: z.string(),
  title2Color: z.string(),
  finalText: z.string(),
  logoColor: z.string(),
});

// ২. টাইটেল কম্পোনেন্ট (পুনরায় ব্যবহারযোগ্য)
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

// ৩. মেইন কম্পোজিশন (Props গ্রহণ করছে)
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
      
      {/* ব্যাকগ্রাউন্ড */}
      <Sequence from={0}>
         <AbsoluteFill style={{ background: `linear-gradient(to bottom right, #1a2a6c, #b21f1f, ${logoColor})` }} />
      </Sequence>

      {/* সিন ১: মেইন টাইটেল */}
      <Sequence from={10} durationInFrames={90}>
        <ProTitle title={title1} color={title1Color} delay={0} type="pop" />
      </Sequence>

      {/* সিন ২: সাব-টাইটেল */}
      <Sequence from={60} durationInFrames={120}>
         <div style={{ position:'absolute', bottom: 100, left: 100, width: '100%' }}>
            <ProTitle title={title2} color={title2Color} delay={0} type="slide" />
         </div>
      </Sequence>

      {/* সিন ৩: ফাইনাল মেসেজ */}
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