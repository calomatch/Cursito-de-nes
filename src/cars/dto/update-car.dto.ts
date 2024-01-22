import { IsOptional, IsString, IsUUID } from 'class-validator';


export class UpdateCarDto{

    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsOptional()
    @IsString({ message: `The brand must be a string`})
    readonly brand?: string;

    @IsOptional()
    @IsString({ message: `The model must be a string`})
    readonly model?: string;
}