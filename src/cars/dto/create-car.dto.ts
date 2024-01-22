import { IsEmpty, IsString } from 'class-validator';


export class CreateCarDto{

    @IsEmpty()
    readonly id: string;

    @IsString({ message: `The brand must be a string`})
    readonly brand: string;

    @IsString({ message: `The model must be a string`})
    readonly model: string;
}