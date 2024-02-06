import { useState } from "react";
import API from "../../util/axios";
import { Cookies } from "react-cookie";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

interface Animal {
  animalId: number;
  isActive: boolean;
  onToggle: () => void;
}

const LikeButton: React.FC<Animal> = ({ animalId, isActive, onToggle }) => {
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  const handleButtonClick = async () => {
    if (loading || !token) return;
    setLoading(true);
    const data = {
      isliked: true,
    };
    try {
      if (isActive) {
        console.log(token);
        await API.delete(`/api/animals/${animalId}/likes`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
      } else {
        await API.post(`/api/animals/${animalId}/likes`, data, {
          method: "POST",
          headers: {
            Authorization: token,
          },
        });
      }

      onToggle();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      style={{ width: "25px", height: "25px" }}
    >
      {isActive ? (
        <FcLike style={{ width: "100%", height: "100%" }} />
      ) : (
        <FcLikePlaceholder style={{ width: "100%", height: "100%" }} />
      )}
    </button>
  );
};

export default LikeButton;
