import "./index.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

export const AnimeList = gql`
query Query($page: Int) {
  Page(page: $page) {
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
  const [page, setPage] = useState (1);
  const {loading, error, data} = useQuery(AnimeList , {variables: { "page" : page} });

  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    setPage(page - 1);
  }

  console.log(data?.Page?.media[0]);
  if(loading) return (<h1>Loading...</h1>);
  if(error) return (<h3>{JSON.stringify(error)}</h3>)

  return (
    <div className="container">
      <h1>Anime List </h1>
      <hr width="80%" />
      {data?.Page?.media.map((anime) => (
        <>
          <div className="card">
            <img src={anime.coverImage.medium} alt="coverImage" />
            <div>
              <h1>{anime.title.english}</h1>
              <div className="episodes">
                Episodes <b>{anime.episodes}</b>{" "}
              </div>
              <div dangerouslySetInnerHTML={{__html: anime.episodes}} />
            </div>
          </div>
          <hr width="75%"/>
        </>
      ))}
        <div className="buttonContainer">
          {page !== 1 && <button onClick={previousPage}>Previous Page</button>}
          <div className="pageText">{page}</div>
          <button onclick={nextPage}>Next Page</button>
        </div>
    </div>
  );
}

export default App;
