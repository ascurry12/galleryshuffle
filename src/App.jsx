import { useState } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import ArtDisplay from "./components/ArtDisplay";
import BanList from "./components/BanList";
const APP_TOKEN = import.meta.env.ARTSY_APP_TOKEN;

function App() {
  let bannedFound = false;
  const [banInputs, setBanInputs] = useState([]);
  const [artwork, setArtwork] = useState({
    artist: "",
    title: "",
    category: "",
    medium: "",
    date: "",
    image: "",
    image_small: "",
  });
  const [prevArtwork, setPrevArtwork] = useState([]);

  const callAPI = async () => {
    const art_response = await fetch(
      "https://api.artsy.net/api/artworks?sample=1",
      {
        headers: {
          "X-Xapp-Token":
            "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI3MDMyMzI3YS1iNmY3LTQ1NTktOGQwMS01NmY1NzM1ZDVhZTYiLCJleHAiOjE3NDM2MzI1NTEsImlhdCI6MTc0MzAyNzc1MSwiYXVkIjoiNzAzMjMyN2EtYjZmNy00NTU5LThkMDEtNTZmNTczNWQ1YWU2IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY3ZTQ3ZTI3MWUzMGQ3MDAxMzg4NzI1MiJ9.mT8woxzAVrhuYa0ZAqEV4xpgJZjIoPL-QwX_-lRdWDA",
          Accept: "application/vnd.artsy-v2+json",
        },
      }
    );

    const art_json = await art_response.json();

    // console.log(art_json);

    if (art_json._links && art_json._links.artists) {
      const artist_response = await fetch(art_json._links.artists.href, {
        headers: {
          "X-Xapp-Token":
            "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI3MDMyMzI3YS1iNmY3LTQ1NTktOGQwMS01NmY1NzM1ZDVhZTYiLCJleHAiOjE3NDM2MzI1NTEsImlhdCI6MTc0MzAyNzc1MSwiYXVkIjoiNzAzMjMyN2EtYjZmNy00NTU5LThkMDEtNTZmNTczNWQ1YWU2IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY3ZTQ3ZTI3MWUzMGQ3MDAxMzg4NzI1MiJ9.mT8woxzAVrhuYa0ZAqEV4xpgJZjIoPL-QwX_-lRdWDA",
          Accept: "application/vnd.artsy-v2+json",
        },
      });

      const artist_json = await artist_response.json();

      // console.log(artist_json);
      // console.log(artist_json._embedded.artists ? artist_json._embedded.artists[0].name : null);

      if (
        artist_json._embedded &&
        artist_json._embedded.artists != null &&
        art_json.title &&
        art_json.category &&
        art_json.medium &&
        art_json.date &&
        art_json._links.thumbnail != null
      ) {
        const newArtwork = {
          artist:
            artist_json._embedded && artist_json._embedded.artists.length > 0
              ? artist_json._embedded.artists[0].name
              : null,
          title: art_json.title,
          category: art_json.category,
          medium: art_json.medium,
          date: art_json.date,
          image: art_json._links.thumbnail.href,
          image_small:
            art_json._links.image && art_json.image_versions.includes("small")
              ? art_json._links.image.href.replace("{image_version}", "small")
              : null,
        };

        const artworkKeys = Object.keys(newArtwork);
        for (let i = 0; i < artworkKeys.length; i++) {
          for (let j = 0; j < banInputs.length; j++) {
            if (newArtwork[artworkKeys[i]] == banInputs[j].value) {
              bannedFound = true;
              break;
            }
          }
          if (bannedFound) break;
        }

        if (bannedFound) {
          bannedFound = false;
          callAPI();
        }
        else {
          setArtwork(newArtwork);
          setPrevArtwork((prevWorks) => [...prevWorks, newArtwork]);
          console.log(prevArtwork);
        }
      } else {
        callAPI();
      }
    } else {
      callAPI();
    }
  };

  const onAttributeClick = (e) => {
    var found = false;
    for (let i = 0; i < banInputs.length; i++) {
      if (banInputs[i].value == e.target.innerText) {
        found = true;
        break;
      }
    }

    if (!found) {
      const id = e.target.getAttribute("id");
      const object = {
        value: e.target.innerText,
        type: id,
        banned: true,
      };
      setBanInputs((bannedInputs) => [...bannedInputs, object]);
    }
  };

  return (
    <div className="grid-container">
      <Gallery className="grid-item" seen={prevArtwork} />
      <ArtDisplay
        className="grid-item"
        artwork={artwork}
        onAttributeClick={onAttributeClick}
        onDiscoverClick={callAPI}
      />
      <BanList
        className="grid-item"
        inputs={banInputs}
        setBanInputs={setBanInputs}
      />
    </div>
  );
}

export default App;
