import './Pages.css'

export default function Pages ({currentPage, setCurrentPage, numberOfPages}) {
    var pageNumbers = []
    for(var i = 1; i <= numberOfPages ;i++){
        pageNumbers.push(i)
    }

    return <nav className="pages-nav">
        <ul className='pages-ul'>
            {pageNumbers.map(p => {
                return <li key={p}><button className={currentPage === p ? 'active' : 'pages-button'} onClick={() => {setCurrentPage(p)}}>{p}</button></li>
            })}
        </ul>
    </nav>
}