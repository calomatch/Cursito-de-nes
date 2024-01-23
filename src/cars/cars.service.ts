import { BadRequestException, Injectable, NotFoundException, Delete } from '@nestjs/common';
import { Car } from './interfaces/cars.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Yaris'
        // },
        // {
        //     id: uuid(),
        //     brand:'Honda',
        //     model: 'Civic'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Jeep',
        //     model: 'cherokee'
        // },
    ];

    findAll(){
        return this.cars;
    }

    findOneById( id: string ){

        const car = this.cars.find(car => car.id === id);

        if (!car) throw new NotFoundException(`Car with id '${ id }' not found`)

        return car
    }

    create( createCarDto: CreateCarDto ) {
        const validateModel = this.cars.find(car => car.model == createCarDto.model);

        if(validateModel){
            throw new BadRequestException("El modelo no puede repetirse");
        }
        const car: Car ={
            id: uuid(),
            ...createCarDto

        }
        this.cars.push(car);

        return car; 
    }

    update( id: string, UpdateCarDto: UpdateCarDto ) {

        let carDB = this.findOneById( id )

        if( UpdateCarDto.id && UpdateCarDto.id !==id )
            throw new BadRequestException(`Car id is not valid inside body`)
        
        this.cars = this.cars.map( car =>{
            
            if ( car.id === id){
                carDB= { ...carDB, ...UpdateCarDto, id,}

                return carDB;
            }

            return car;
        })

        return carDB;
    }
    delete( id: string ) {

        let carDB = this.findOneById( id );
        this.cars = this.cars.filter(car => car.id !==id); 
    

    }
    fillCarsWithSeedData( cars: Car[]){
        this.cars = cars;
    }
}
