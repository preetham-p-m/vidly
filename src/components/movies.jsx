import React, {Component} from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from './common/like';
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListView from "./common/listview";

class Movies extends Component {
    state = {
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4,
    }; 

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    getMovieRows = () => {
        const { currentPage, pageSize, movies: allMovies} = this.state;
        const movies = paginate(allMovies, currentPage, pageSize);
        return movies.map(movie => (
            <tr key={movie._id}>
                <td> {movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
            </tr>
        ));
    }

    render() { 
        const { length: count } = this.state.movies;
        const { currentPage, pageSize} = this.state;
        if ( count === 0)
            return <h4>There are no movies to show in the database</h4>
        return (
            <React.Fragment>
                <div class="row">
                    <div class="col-2">
                        <ListView />
                    </div>
                    <div class="col-6">
                        <h4>Showing {count} movies in the database</h4>
                        <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col">Like</th>
                                    </tr>
                                </thead>
                                <tbody>{ this.getMovieRows() }</tbody>
                        </table>
                        <Pagination itemsCount={count} currentPage={ currentPage } pageSize = { pageSize } onPageChange = {this.handlePageChange} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Movies;