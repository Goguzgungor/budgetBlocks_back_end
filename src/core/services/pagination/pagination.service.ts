import { PaginateFilterItem } from "./pagination.dto";

/**
 * Kullanımı
 * 
 * Prisma

        const pagination = new PaginationPrisma(query, {
            search: ['last_name', 'first_name']
        });

        const getResult = await this.customer.findCustomerAll(pagination.get());
        const response = new PaginationResponse(getResult, pagination.getPageInfo());
        return response;
 * 
 *  RAW Query'de
 * 
 *     const pagination = new PaginationRaw(query, {
 *          search: ['last_name', 'first_name']
 *      });
 * 
 * 
 * Query Model tanımlanması
 * page, limit, keyword dışındaki tüm alanlar filtre olaram uygulanır.
 * Ör : is_sso_user = true gibi
 * 

export class CustomerPagerRequestDto extends PaginationRequest {
    
    @ApiProperty({ type: Boolean, required: false, description: 'Durum kodu'})
    @Type(() => Boolean)
    is_sso_user?: boolean;

    @ApiProperty({ type: String, required: false, description: 'Durum kodu'})
    sms_code?: string;

    @ApiProperty({ type: String, required: false, description: 'Ör : first_name:ASC', enum:['id:ASC','id:DESC','first_name:ASC','first_name:DESC','last_name:ASC','last_name:DESC']})
    sort: string = 'id:ASC';
    
}
 *
 * MODEL TANIMI
 
  async findCustomerAll(filter: any) {
    const total_count = await this.dbService.customers.count(Object.assign({},{where: filter.where}))
    const data = await this.dbService.customers.findMany(filter);
    return new PaginationResponse({
      total_count,
      data,
      page: filter.skip,
      limit: filter.take
    });
  }
 */

export class PaginationService{

    public params: any;
    private options: PaginateFilterItem;
    public where = {
        sort: {},
        search: {},
        filter: {},
        paginate: {
            skip: 0,
            take: 12
        }
    };

    constructor(params, options){
        this.params = params;
        this.options = options;
        this.createPaginate();
    }


    createPaginate(){

        //Paginate
        this.where.paginate = {
            skip: Number((this.params.page - 1) * this.params.limit), 
            take: this.params.limit
        };


        //Keyword
        if(this.params?.keyword && this.params.keyword.length > 0 && this.options?.search && this.options?.search.length > 0){
            this.options.search.forEach(i => {
                this.where.search[""+i] = this.params.keyword;
            });
        }


        //OrderBy
        if(this.params.sort){
            const parse = this.params.sort.split(':');
            if(parse && Array.isArray(parse) && parse.length > 0 && ['ASC','DESC'].includes(parse[1])){
                const obj = {}
                obj[parse[0]] = parse[1].toLowerCase();
                this.where.sort = obj;
            }
        }


        //Filter
        const filterItems = Object.keys(this.params).filter(i => {
            return !['page','limit','keyword','sort'].includes(i);
        });

        if(Array.isArray(filterItems) && filterItems.length > 0){
            filterItems.forEach(i => {
                if(typeof this.params[i] !== 'undefined'){
                    this.where.filter[""+i] = this.params[i];
                }
            });
        }

    }


    getPageInfo(){
        return {
            page: this.params.page,
            limit: this.params.limit
        }
    }
}


export class PaginationPrisma extends PaginationService {

    getSorted() {
        return this.where.sort;
    }

    getSearch(){
        const searchResult = []
        Object.entries(this.where.search).forEach(i => {
            const obj = {};
            obj[i[0]] = {
                contains: i[1],
                mode: 'insensitive'
            }
            searchResult.push(obj);
        })

        if(searchResult.length > 0)
            return { OR : searchResult }
    }

    getFilter(){
        return this.where.filter
    }

    getPagination() {
        return this.where.paginate;
    }



    getWhere(params: object = {}){
        return Object.assign(
            {},
            params || {},
            this.getSearch(),
            this.getFilter()
        )
    }


    get(params: object = {}){
        return Object.assign(
            {},
            params,
            this.getPagination(),
            {
                orderBy: this.getSorted(),
                where: Object.assign(
                    {},
                    this.getSearch(),
                    this.getFilter()
                )
            }
        );
    }
}


export class PaginationRaw extends PaginationService {

    getSorted() {
        const sort = Object.entries(this.where.sort).map(i=>{
            return `${i[0]} ${i[1]}`;
        })
        if(Array.isArray(sort) && sort.length > 0)
            return `ORDER BY ${sort.join(', ')}`
    }

    getSearch(){
        const search = Object.entries(this.where.search).map(i=>{
            return `${i[0]} ILIKE '%${i[1]}%'`
        }).join(' OR ');

        return search ? `(${search})`: ``;
    }

    getFilter(){
        return Object.entries(this.where.filter).map(i=>{
            return `${i[0]} = '${i[1]}'`
        }).join(' AND ')
    }

    getPagination() {
        return  `OFFSET ${this.where.paginate.skip} LIMIT ${this.where.paginate.take}`
    }

    getWhere(prefix?: string){
        return [
            prefix, 
            this.getFilter(),
            this.getSearch()
        ].join(" ")
    }


    get(prefix: string = "WHERE"){
        return [
            prefix, 
            this.getFilter(),
            this.getSearch(),
            this.getSorted(),
            this.getPagination()
        ].join(" ")
    }

}
