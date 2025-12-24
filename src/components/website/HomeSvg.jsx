import React from "react";

const HomeSvg = ({ images = [] }) => {
  // console.log(images);
  const img1 = images[0]?.FilePath?.replace(/\\/g, "/");
  const img2 = images[1]?.FilePath?.replace(/\\/g, "/");
  // console.log(img1, img2);
  return (
    <svg width="100%" viewBox="0 0 900 1100" role="img" aria-label="Scheme preview">

      <g transform="translate(50,40)">
        <rect width="800" height="420" rx="6" fill="#fff" stroke="#cfcfcf" strokeWidth="2" />
        {
          img1 ? (
            <image
              href={img1}
              x="0"
              y="0"
              width="800"
              height="420"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <g fill="#444" fontFamily="Inter, Arial, sans-serif" fontSize="12" transform="translate(20,18)">
              <rect x="0" y="0" width="760" height="18" fill="#f5f5f5" rx="2" />
              <g fill="#333" opacity="0.9">
                <rect x="0" y="30" width="720" height="8" rx="2" />
                <rect x="0" y="48" width="600" height="8" rx="2" />
                <rect x="0" y="66" width="760" height="8" rx="2" />
                <rect x="0" y="84" width="760" height="8" rx="2" />
                <rect x="0" y="102" width="760" height="8" rx="2" />
                <rect x="0" y="120" width="520" height="8" rx="2" />
              </g>
              <rect x="0" y="150" width="760" height="220" fill="#fbfbfb" rx="2" stroke="#eee" />
              <g fill="#666" opacity="0.9">
                <rect x="12" y="164" width="140" height="12" rx="2" />
                <rect x="160" y="164" width="120" height="12" rx="2" />
                <rect x="288" y="164" width="120" height="12" rx="2" />
                <rect x="416" y="164" width="120" height="12" rx="2" />
                <rect x="544" y="164" width="200" height="12" rx="2" />
              </g>
            </g>
            // )
          )
        }
      </g>

      <g transform="translate(50,490)">
        <rect width="800" height="320" rx="6" fill="#fff" stroke="#cfcfcf" strokeWidth="2" />
        {
          img2 ? (
            <image
              href={img2}
              x="0"
              y="0"
              width="800"
              height="320"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <g transform="translate(24,18)" fill="#444" fontFamily="Inter, Arial, sans-serif" fontSize="12">
              <rect x="0" y="0" width="240" height="16" fill="#f7f7f7" rx="2" />
              <rect x="0" y="36" width="720" height="8" rx="2" fill="#ededed" />
              <rect x="0" y="54" width="520" height="8" rx="2" fill="#ededed" />
              <rect x="0" y="72" width="760" height="8" rx="2" fill="#ededed" />
              <rect x="0" y="90" width="760" height="8" rx="2" fill="#ededed" />
              <rect x="0" y="110" width="760" height="8" rx="2" fill="#ededed" />
            </g>
          )
        }
      </g>
    </svg>
  )
};

export default HomeSvg;
