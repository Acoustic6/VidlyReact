import React, { Component } from "react";
import { getMovies, deleteMovie } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  render() {
    const { length: moviesCount } = this.state.movies;

    return (
      <div>
        <h2>{moviesCount === 0 ? 'No movies here' : moviesCount + ' movies avaliable'}</h2>
        <table className="table m-5">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(m =>
              <tr key={m._id}>
                <th>{m.title}</th>
                <th>{m.genre.name}</th>
                <th>{m.numberInStock}</th>
                <th>{m.dailyRentalRate}</th>
                <th>
                  <button className="btn btn-danger" onClick={() => this.deleteMovieBy(m._id)}>Delete</button>
                </th>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    );
  }

  deleteMovieBy(id) {
    deleteMovie(id);
    this.setState({
      movies: getMovies()
    });
  }
}

export default Movies;
