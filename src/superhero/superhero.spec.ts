import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { validate } from 'class-validator';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroService],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should validate that humilityScore is an integer between 1 and 10', async () => {
    const dto = new CreateSuperheroDto();
    dto.name = 'Hero';
    dto.superpower = 'Flight';

    // Test with invalid humilityScore (not a number)
    dto.humilityScore = 'not-a-number' as any;
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');

    // Test with invalid humilityScore (out of range)
    dto.humilityScore = 11;
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('max');

    // Test with valid humilityScore
    dto.humilityScore = 5;
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate that name is a non-empty string', async () => {
    const dto = new CreateSuperheroDto();
    dto.name = ''; // Invalid value
    dto.superpower = 'Flight';
    dto.humilityScore = 5;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should validate that superpower is a non-empty string', async () => {
    const dto = new CreateSuperheroDto();
    dto.name = 'Hero';
    dto.superpower = ''; // Invalid value
    dto.humilityScore = 5;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should add and retrieve superheroes sorted by humility score', () => {
    service.addSuperhero({ name: 'Hero1', superpower: 'Flight', humilityScore: 8 });
    service.addSuperhero({ name: 'Hero2', superpower: 'Invisibility', humilityScore: 10 });
    service.addSuperhero({ name: 'Hero3', superpower: 'Strength', humilityScore: 5 });

    const superheroes = service.getSuperheroes();
    expect(superheroes[0].name).toBe('Hero2');
    expect(superheroes[1].name).toBe('Hero1');
    expect(superheroes[2].name).toBe('Hero3');
  });


});