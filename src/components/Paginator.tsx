import { Pagination } from "react-bootstrap"

type PaginatorProps = {
    count: number,
    countOnPage: number,
    currentPage: number,
    onChangePage: (page: number) => void
}
export const Paginator: React.FC<PaginatorProps> = ({ 
    count, 
    countOnPage,
    currentPage,
    onChangePage 
}) => {
   
    const countPages = Math.ceil(count / countOnPage)

    const pages = Array(countPages).fill('').map((v,i)=>i+1)

    return <>
        <Pagination>
            <Pagination.Prev 
                onClick={() => currentPage > 1 && onChangePage(currentPage -1)} 
                disabled={currentPage == 1}
                />
            {pages.map(page => (
                <Pagination.Item 
                    key={page} 
                    active={page === currentPage}
                    onClick={() => onChangePage(page)}
                    >
                    {page}
                </Pagination.Item>
            ))}
            <Pagination.Next 
                onClick={() => currentPage < countPages && onChangePage(currentPage + 1)} 
                disabled={currentPage == countPages}
                />
        </Pagination>
    </>
}