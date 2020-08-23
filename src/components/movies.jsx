import React, { Component } from "react";
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';

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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie =>
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like
                  liked={movie.liked} movie={movie}
                  onLikeStateChanged={() => this.handleLikeStateChanged(movie)} />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.deleteMovieBy(movie._id)}>Delete</button>
                </td>
              </tr>
            )}
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

  handleLikeStateChanged = movie => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }
}

export default Movies;
