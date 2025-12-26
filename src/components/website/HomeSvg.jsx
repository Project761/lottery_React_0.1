import React from "react";

const HomePreview = ({ images = [] }) => {
  const img1Url = images[0]?.FilePath?.replace(/\\/g, "/");
  const img2Url = images[1]?.FilePath?.replace(/\\/g, "/");

  // const img1Url = img1 ? `https://${img1}` : null;
  // const img2Url = img2 ? `https://${img2}` : null;

  const boxStyle = {
    border: "2px solid #cfcfcf",
    borderRadius: 8,
    background: "#fff",
    overflow: "hidden",
    width: "100%",
    minHeight: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  };

  if (!img1Url && !img2Url) {
    return (
      <div className="text-center py-5">
        <h2 className="text-muted">Paper Cut Coming Soon...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>

      {images.map((image, index) => {
        const imgUrl = image?.FilePath?.replace(/\\/g, "/");
        if (!imgUrl) return null;
        return (
          <div key={index} style={{ ...boxStyle, marginBottom: 20 }}>
            <img src={imgUrl} alt={`Top Preview ${index + 1}`} style={imgStyle} />
          </div>
        );
      })}

      {/* TOP IMAGE */}
      {/* {img1Url && (
        <div style={{ ...boxStyle, marginBottom: 20 }}>
          <img src={img1Url} alt="Top Preview" style={imgStyle} />
        </div>
      )} */}

      {/* BOTTOM IMAGE */}
      {/* {img2Url && (
        <div style={boxStyle}>
          <img src={img2Url} alt="Bottom Preview" style={imgStyle} />
        </div>
      )} */}
    </div>
  );
};

export default HomePreview;
