import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString({ message: 'text have to a string' })
    @IsNotEmpty({ message: 'text cannot be an empty' })
    readonly text: string;
}
