import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import PartnersService, {
    ApplicationAlreadyExistsException,
    PartnerNotFoundException,
} from '../service/partners.service';
import { CreatePartnerDTO } from '../dto/create.dto';
import { UpdatePartnerDTO } from '../dto/update.dto';

@Controller('partners')
export class PartnersController {

    constructor(private readonly partnersService: PartnersService) {
    }

    @Get()
    public async list(@Query() query): Promise<any[]> {
        return this.partnersService
          .list(query);
    }

    @Get(':id')
    public async get(@Param('id') id): Promise<any> {
        try {
            return await this.partnersService
              .get(id);
        }
        catch (e) {
            throw (e instanceof PartnerNotFoundException)
              ? new NotFoundException(e.message)
              : new InternalServerErrorException(e);
        }
    }

    @Get('search')
    public async search(@Query() query): Promise<any> {
        return this.partnersService
          .search(query);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    public async create(@Body() createPartnerDTO: CreatePartnerDTO): Promise<any> {
        try {
            return await this.partnersService
              .create(createPartnerDTO);
        }
        catch (e) {
            throw (e instanceof ApplicationAlreadyExistsException)
              ? new ConflictException(e.message)
              : new InternalServerErrorException(e);
        }
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    public async update(@Param('id') id, @Body() updatePartnerDTO: UpdatePartnerDTO): Promise<any> {
        try {
            await this.partnersService
              .update(id, updatePartnerDTO);
        }
        catch (e) {
            throw (e instanceof PartnerNotFoundException)
              ? new NotFoundException(e.message)
              : new InternalServerErrorException(e);
        }
    }

    @Delete(':id')
    public async remove(@Param('id') id): Promise<any> {
        try {
            await this.partnersService
              .remove(id);
        }
        catch (e) {
            throw (e instanceof PartnerNotFoundException)
              ? new NotFoundException(e.message)
              : new InternalServerErrorException(e);
        }
    }
}
