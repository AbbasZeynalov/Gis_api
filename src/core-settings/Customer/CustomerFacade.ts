import {EntityManager, Repository} from "typeorm";
import CustomerRepository from "../dal/CustomerRepository";

export default class CustomerFacade {

    protected customerRepository: CustomerRepository;
    protected deCipher: any;

    constructor(customerRepository: CustomerRepository, deCipher: any) {
        this.customerRepository = customerRepository;
        this.deCipher = deCipher;
    }

    public async getDbConnStr(): Promise<string> {

        let customer = await this.customerRepository.getCustomer();

        let connStr = this.deCipher(customer.db_conn_secret, customer.key);

        return connStr;
    }
}