import { db } from './database';

const defaultLimit = 10;
const maxLimit = 1000;

export const random = (req, res) => {

    const maxLength = Math.sign(req.query.max_length) === 1 ? req.query.max_length : null;
    const withMaxLength = 'WHERE length(fact) <= ' + maxLength;

    const fact = db.prepare(`SELECT fact, length(fact) length from facts
        ${maxLength ? withMaxLength : ''}
        ORDER BY RANDOM() LIMIT 1
    `).get();

    res.send(fact || {})
}

export const list = (req, res) => {

    const maxLength = Math.sign(req.query.max_length) === 1 ? req.query.max_length : null;
    const withMaxLength = 'WHERE length(fact) <= ' + maxLength;

    const total = db.prepare(`SELECT count(*) count from facts
        ${maxLength ? withMaxLength : ''}
    `).get().count;

    const limit = Math.sign(req.query.limit) === 1 
        ? Math.min(Math.max(req.query.limit), maxLimit)
        : defaultLimit;
    
    const lastPage = Math.ceil(total / limit);
    const currentPage = Math.min(Math.max(parseInt(req.query.page) || 1, 1), lastPage);

    const data = db.prepare(`
        SELECT fact, length(fact) length from facts
        ${maxLength ? withMaxLength : ''}
        LIMIT ${limit}
        OFFSET ${(currentPage - 1) * limit}
    `).all();

    const from = (currentPage - 1) * limit + 1;
    const to = currentPage < lastPage ? (from - 1) + limit : total; 
    
    const path = () => req.protocol + '://' + req.get('host') + req.path;

    const pageURL = (page) => {
        return path() + `?page=${page}`
            + (limit !== defaultLimit ? `&limit=${limit}` : '')
            + (maxLength ? `&max_length=${maxLength}` : '');
    }

    const output = {
        total: total,
        per_page: limit,
        current_page: currentPage,
        last_page: lastPage,
        from: from,
        to: to,
        first_page_url: pageURL(1),
        last_page_url: pageURL(lastPage),
        next_page_url: currentPage < lastPage ? pageURL(currentPage + 1) : null,
        prev_page_url: currentPage > 1 ? pageURL(currentPage - 1) : null,
        path: path(),
        data: data,
    }

    res.send(output)
}
