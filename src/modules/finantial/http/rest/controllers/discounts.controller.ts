import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateDiscountDto } from "../dtos/create-discount.dto";
import { DiscountsService } from "src/modules/finantial/core/services/discounts.service";

@Controller('discounts')
export class DiscountsController {

  constructor(private readonly discountService: DiscountsService) {}
  
  @Post()
  async create(@Body() data: CreateDiscountDto) {
    return await this.discountService.add(data)
  }

  @Get()
  async find() {
    return await this.discountService.find()
  }

}