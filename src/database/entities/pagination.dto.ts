import { Sort } from '@app/app.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsEnum, IsNumber } from 'class-validator';

export class PaginationDto {
    @Type(() => Number)
    @ApiProperty({ type: Number, example: 1, name: 'page', description: 'Specify the page' })
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber({}, { message: 'Please provide a valid page no.' })
    @Expose()
    public readonly page!: number;

    @Type(() => Number)
    @ApiProperty({
        type: Number,
        example: 25,
        nullable: true,
        name: 'per_page',
        description: 'Number of items on each request',
    })
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber({}, { message: 'Please provide a valid page.' })
    @Expose({ name: 'per_page' })
    public readonly perPage!: number;

    @ApiProperty({ enum: Sort, example: Sort.DESC, name: 'order', description: 'Specify the order' })
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Sort)
    @Expose({ name: 'order' })
    @Transform(({ value }) => value ?? Sort.DESC)
    public readonly order!: Sort;
}
