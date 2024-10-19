import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpCode, ConflictException, InternalServerErrorException, NotFoundException, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return{
      message: "Success Get All Products!",
      statusCode: HttpStatus.OK,
      data: products
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);
    return {
      message: `Success Get Product By ID = ${id}`,
      statusCode: HttpStatus.OK,
      data: product
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto) {
    try{
      const product = await this.productsService.create(createProductDto);
      return {
        message: "Berhasil Menambahkan Product!",
        statusCode: HttpStatus.CREATED,
        data: product,
      }; 
    } catch(error){
      if (error instanceof ConflictException) {
        throw new ConflictException({
          message: error.message,
          statusCode: HttpStatus.CONFLICT,
          data: null,
        });
      }
      throw new InternalServerErrorException({
        message: "Terjadi kesalahan saat menambahkan product!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.update(id, updateProductDto);
    if (!product){
      throw new NotFoundException({
        message : `Cannot find Product with ID = ${id}`,
        statusCode : HttpStatus.NOT_FOUND,
        data: null
      })
    }
    return {
      message : `Success Update Data Product By ID = ${id}`,
      statusCode : HttpStatus.OK,
      data : product 
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.productsService.remove(id);
    return {
      message: "Berhasil Menghapus Data Product!",
      statusCode: HttpStatus.OK,
      data: null,
    }; 
  }
}
