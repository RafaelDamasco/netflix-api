import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import ShowCategory from "../enums/show-category.enum";

@Entity("shows")
class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 100 })
  director: string;

  @Column({ length: 200 })
  actors: string;

  @Column({ type: "longtext" })
  description: string;

  @Column({ length: 200 })
  cover: string;

  @Column({ type: "enum", default: ShowCategory.MOVIE, enum: ShowCategory })
  category: ShowCategory;
}

export default Show;