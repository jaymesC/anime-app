import "./index.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

export const AnimeList = gql`
query Query {
  Page {
    media {
      siteUrl
      title {
        english
        native
      }
      description
      coverImage {
        medium
      }
      bannerImage
      volumes
      episodes
    }
  }
}
`;

function App() {
  const [page, setPage] = useState (1)

  return <div></div>;
}

export default App;
