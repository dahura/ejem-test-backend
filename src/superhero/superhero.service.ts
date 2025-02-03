import { Injectable } from '@nestjs/common';
import { Superhero } from './interfaces/superhero.interface';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class SuperheroService {
  private superheroes: Superhero[] = [];

  addSuperhero(superheroDto: CreateSuperheroDto) {
    const id = this.superheroes.length + 1;
    const superhero: Superhero = { ...superheroDto, id };
    this.superheroes.push(superhero);
  }

  getSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}