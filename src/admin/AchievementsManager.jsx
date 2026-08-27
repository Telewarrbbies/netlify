import { useState } from "react";

const AchievementsManager = () => {

  const [achievements, setAchievements] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [issuer, setIssuer] =
    useState("");

  const [image, setImage] =
    useState("");

  const addAchievement = () => {

    if (!title) return;

    setAchievements([
      ...achievements,
      {
        id: Date.now(),
        title,
        issuer,
        image,
      },
    ]);

    setTitle("");
    setIssuer("");
    setImage("");

  };

  const deleteAchievement = (id) => {

    setAchievements(
      achievements.filter(
        (item) => item.id !== id
      )
    );

  };

  return (

    <div>

      <h2>
        Achievement Manager
      </h2>

      <div className="admin-form">

        <input
          placeholder="Certificate Name"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          placeholder="Issuer"
          value={issuer}
          onChange={(e) =>
            setIssuer(e.target.value)
          }
        />

        <input
          placeholder="Certificate Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <button
          onClick={addAchievement}
        >
          Add Certificate
        </button>

      </div>

      {achievements.map((item) => (

        <div
          key={item.id}
          className="admin-item"
        >

          <div>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.issuer}
            </p>

          </div>

          <button
            onClick={() =>
              deleteAchievement(
                item.id
              )
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

};

export default AchievementsManager;