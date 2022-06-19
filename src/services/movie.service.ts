import { Repository } from "typeorm"
import { AppDataSource } from "../../configs/database/data-source"
import Movie from "../entities/movie.entity"

interface CreateMovieDTO {
    title: string
}

class MovieService {
   private movieRepository: Repository<Movie>

  constructor() {
    this.movieRepository = AppDataSource.getRepository(Movie)
  }

  list() {
    this.movieRepository.find()
  }

  create(movie: CreateMovieDTO) {
    return this.movieRepository.save(movie)
  }
}

export default MovieService
