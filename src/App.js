import React from 'react';
import './App.css';

/* the query used to fetch the data needed from the api with graphQL */
const LAUNCHES_QUERY = `
{
  launchesPast(limit: 5, order: "desc", sort: "launch_date_local") {
    id
    rocket {
      rocket {
        name
        stages
        first_stage {
          thrust_sea_level {
            kN
            lbf
          }
        }
        second_stage {
          thrust {
            kN
            lbf
          }
        }
      }
    }
    launch_date_local
  }
}
`


function App() {
  
  const launches = useLaunches()

  return (
    <div className="App" class="bg-light">
      <div class="bg-img">
        <div class="container mx-auto launch-list-style">
          <div class="container border border-dark rounded bg-dark text-light shadow ">
            {/* title */}
            <div class="row mb- bg-dark text-center text-light py-2 mx-0">
              <h2>List of the 5 latest SpaceX missile launches</h2>
            </div>
            {/* titles for each type of rocket data */}
            <div class="row text-center mt-2">
              <h4 class="col-2">Rocket name</h4>
              <h4 class="col-2">Stages</h4>
              <h4 class="col-4">First-stage thrust</h4>
              <h4 class="col-4">Second-stage thrust</h4>
            </div>
            {/* loops through and lists the data from the api with the launches-method */}
            {launches.map((launch) => (
              <div class="row text-center my-2 bg-gradient px-3 mx-0 justify-content-center" key={launch.id}>
                <p class="col-2">{launch.rocket.rocket.name}</p>
                <p class="col-2">{launch.rocket.rocket.stages}</p>
                <p class="col-2">kN: {launch.rocket.rocket.first_stage.thrust_sea_level.kN}</p>
                <p class="col-2">lbf: {launch.rocket.rocket.first_stage.thrust_sea_level.lbf}</p>
                <p class="col-2">kN: {launch.rocket.rocket.second_stage.thrust.kN}</p>
                <p class="col-2">lbf: {launch.rocket.rocket.second_stage.thrust.lbf}</p>
              </div>
            ))}

          </div>
        </div>
        {/* footer */}
        <div class="footer text-light text-center mt-5">
          <p class="">Made with <i class="bi bi-cup-fill"></i> and <i class="bi bi-suit-heart-fill"></i> using <a href="https://reactjs.org/">
            React</a>, <a href="https://getbootstrap.com/">Bootstrap</a> and <a href="https://graphql.org/">GraphQL</a></p>
        </div>
      </div>
    </div>
  );
}

function useLaunches() {
  const [launches, setLaunches] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: LAUNCHES_QUERY })
    }).then(response => response.json())
      .then(data => setLaunches(data.data.launchesPast))
  }, []);
  return launches;
}

export default App;
