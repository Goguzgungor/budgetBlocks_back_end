import { PaginationRequest } from './pagination.dto';
import { PaginationPrisma, PaginationRaw } from './pagination.service';

describe('PaginationService', () => {

    const pagination: PaginationRequest = {
        page: 1,
        limit: 12,
        keyword: 'test'
    };

    const paginationPrismaService = new PaginationPrisma(pagination, {
        search: ['last_name', 'first_name']
    });

    const paginationRawService = new PaginationRaw(pagination, {
        search: ['last_name', 'first_name']
    });


    it('Prisma Pagination', async () => {
        expect(paginationPrismaService.getPagination())
    });


    it('Prisma Pagination : keyword empty', async () => {
        const p = (new PaginationPrisma({
            page: 1,
            limit: 12,
            keyword: ''
        }, {
            search: []
        })).getPagination()
        expect(p)
    });


    it('Prisma Pagination : sort', async () => {
        const p = (new PaginationPrisma({
            page: 1,
            limit: 12,
            keyword: 'test',
            sort: 'first_name:asc'
        }, {
            search: ['last_name', 'first_name']
        })).getPagination()
        expect(p)
    });

    it('Raw Pagination', async () => {
        expect(paginationRawService.getPagination())
    });


});