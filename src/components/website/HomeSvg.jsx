import React from "react";

const HomeSvg = ({ images = [] }) => {
  // console.log(images);
  const img1 = images[0]?.FilePath?.replace(/\\/g, "/");
  const img2 = images[1]?.FilePath?.replace(/\\/g, "/");
  // console.log(img1, img2);
  if (!img1 && !img2) return (
    <div className="text-center m-5">
      <h2 style={{ margin: "80px 0 120px 0" }}>Paper Cut Comming Soon...</h2>
    </div>
  );

  return (
    <svg width="100%" viewBox="0 0 900 1100" role="img" aria-label="Scheme preview">
      {img1 &&
        <g transform="translate(50,40)">
          <rect width="800" height="420" rx="6" fill="#fff" stroke="#cfcfcf" strokeWidth="2" />
          {img1 && <image
            href={img1}
            x="0"
            y="0"
            width="800"
            height="420"
            preserveAspectRatio="xMidYMid slice"
          />
          }
        </g>
      }

      {img2 &&
        <g transform="translate(50,490)">
          <rect width="800" height="320" rx="6" fill="#fff" stroke="#cfcfcf" strokeWidth="2" />
          <image
            href={img2}
            x="0"
            y="0"
            width="800"
            height="320"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      }
    </svg>
  )
};

export default HomeSvg;
//In this I want to apply css on "Paper Cut Comming Soon..." text