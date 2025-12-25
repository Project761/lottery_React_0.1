import React from "react";

const HomePreview = ({ images = [] }) => {
  const img1 = images[0]?.FilePath?.replace(/\\/g, "/");
  const img2 = images[1]?.FilePath?.replace(/\\/g, "/");

  const boxStyle = {
    border: "2px solid #cfcfcf",
    borderRadius: 8,
    background: "#fff",
    overflow: "hidden",
    width: "100%",
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

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>

      {/* TOP IMAGE */}
      <div style={{ ...boxStyle,  marginBottom: 20 }}>
        {img1 ? (
          <img src={img1} alt="Top Preview" style={imgStyle} />
        ) : (
          <span style={{ color: "#999" }}>No Image</span>
        )}
      </div>

      {/* BOTTOM IMAGE */}
      <div style={{ ...boxStyle,  }}>
        {img2 ? (
          <img src={img2} alt="Bottom Preview" style={imgStyle} />
        ) : (
          <span style={{ color: "#999" }}>No Image</span>
        )}
      </div>

    </div>
  );
};

export default HomePreview;
