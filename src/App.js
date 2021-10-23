import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import Spinner from "react-svg-spinner";

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
  if(loading) return (
    <div className="spinner">
      <Spinner className="spinner-icon"/>
    </div>
  );
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
                Episodes <b>{anime.episodes}</b>
              </div>
              <div className="cardText" dangerouslySetInnerHTML={{__html: anime.description}} ></div>
            </div>
          </div>
          <hr width="100%"/>
        </>
      ))}
        <div className="buttonContainer">
          {page !== 1 && <button onClick={previousPage}>Previous Page</button>}
          <div className="pageText">{page}</div>
          <button onClick={nextPage}>Next Page</button>
        </div>
    </div>
  );
}

export default App;
