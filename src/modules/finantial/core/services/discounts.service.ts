import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscountsRepository } from "../../persistence/repositories/discounts.repository";
import { Discount } from "../../persistence/entities/discount.entity";
import { CreateDiscountDto } from "../../http/rest/dtos/create-discount.dto";

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepository: DiscountsRepository
  ) {}

  async add(data: CreateDiscountDto) {
    if(!data.discountPercentage && !data.value) {
      throw new HttpException('passing discountPercentage OR value', HttpStatus.BAD_REQUEST)
    }
    const discount = this.discountsRepository.create({
      discountPercentage: data.discountPercentage,
      enabled: data.enabled,
      value: data.value,
      firstInstallment: data.firstInstallment
    })
    await this.discountsRepository.save(discount)
  }

  async find() {
    return await this.discountsRepository.find()
  }

}