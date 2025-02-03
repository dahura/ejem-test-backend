import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  addSuperhero(@Body() superheroDto: CreateSuperheroDto) {
    this.superheroService.addSuperhero(superheroDto);
    return { message: `Superhero ${superheroDto.name} added successfully!` };
  }

  @Get()
  getSuperheroes() {
    return this.superheroService.getSuperheroes();
  }
}