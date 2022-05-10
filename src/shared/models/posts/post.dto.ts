import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString({ message: 'text must be a string' })
    @IsNotEmpty({ message: 'text cannot be an empty' })
    readonly text: string;
}
