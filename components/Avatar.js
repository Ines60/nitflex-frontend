import React, { useState, useEffect } from "react";

function Avatar({ seed, onClick, isSelected }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Génère l'URL de l'avatar avec le style "adventurer-neutral" de l'API v9
    const url = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(
      seed
    )}&size=128`;

    //encodeURIComponent() est une fonction JavaScript qui transforme (ou encode) une chaîne en un format sûr pour une URL.
    //Elle convertit les caractères spéciaux (comme les espaces, les accents, ou les caractères de ponctuation) en une séquence qui respecte le format URL.
    // Met à jour l'URL de l'avatar
    setAvatarUrl(url);
  }, [seed]);

  return (
    <img
      src={avatarUrl}
      alt={`Avatar for seed ${seed}`}
      onClick={onClick}
      style={{
        width: 128,
        height: 128,
        margin: 10,
        cursor: "pointer",
        border: isSelected ? "3px solid blue" : "3px solid transparent",
        borderRadius: "8pxs",
      }}
    />
  );
}

export default Avatar;
