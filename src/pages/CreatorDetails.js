import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreatorDetails.css";
import profilePic from "../assets/profile-pic.jpg";

const creatorsData = [
  {
    id: 1,
    name: "Aurora Blake",
    vibe: "Soft glam rituals",
    specialties: ["Hero reels", "Story takeovers", "Editorial stills"],
    bio: "Aurora translates boutique experiences into luminous visual stories with pearl accents and dreamy transitions.",
  },
  {
    id: 2,
    name: "Maison Hart",
    vibe: "Cozy travel & café crawl diaries",
    specialties: ["Travel vlogs", "In-store filming", "Interview segments"],
    bio: "Maison pairs textured cinematography with heartfelt narration to highlight neighborhood gems and luxe getaways.",
  },
];

const CreatorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = creatorsData.find((item) => item.id === parseInt(id, 10));

  if (!creator) {
    return <p className="creator-missing">Creator not found.</p>;
  }

  return (
    <div className="creator-details-card">
      <img src={profilePic} alt={`${creator.name} profile`} />
      <h2>{creator.name}</h2>
      <span className="creator-vibe">{creator.vibe}</span>
      <div className="creator-specialties">
        {creator.specialties.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
      <p>{creator.bio}</p>
      <button onClick={() => navigate("/your-creators")}>Back to creator management page</button>
    </div>
  );
};

export default CreatorDetails;