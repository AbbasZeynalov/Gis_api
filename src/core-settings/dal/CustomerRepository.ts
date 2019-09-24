import {EntityRepository, Repository} from "typeorm";
import {Customer} from "../entity/Customer";

@EntityRepository(Customer)
export default class CustomerRepository extends Repository<Customer>{

    async getCustomer():Promise<Customer> {

        return await this.findOne() || {} as Customer
    }
}