import { Repository } from "typeorm"
import { AppDataSource } from "../../configs/database/data-source"
import { Show } from "../entities"
import NotFoundException from "../exceptions/not-found-exception.exeption"

interface CreateShowDTO {
    title: string
}

class ShowService {
   private showRepository: Repository<Show>

  constructor() {
    this.showRepository = AppDataSource.getRepository(Show)
  }

  list() {
    return this.showRepository.find({ relations: ['episodes'] })
  }

  async listOne(id: number) {
    const show = await this.showRepository.findOne({ where: { id } })

    if (show) {
      return show
    }

    throw new NotFoundException(`O show id ${id} nao foi encontrado`)
  }

  async delete(id: number) {
    const show = await this.showRepository.delete(id)

    if (show.affected) {
      return show
    }

    throw new NotFoundException(`O show id ${id} nao foi encontrado`)
  }

  create(show: CreateShowDTO) {
    return this.showRepository.save(show)
  }
}

export default ShowService
