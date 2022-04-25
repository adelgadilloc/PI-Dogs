import './Pages.css'

export default function Pages ({setCurrentPage, numberOfPages}) {
    var pageNumbers = []
    for(var i = 1; i <= numberOfPages ;i++){
        pageNumbers.push(i)
    }

    return <nav className="pages-nav">
        <ul className='pages-ul'>
            {pageNumbers.map(p => {
                return <li className="pages-li" key={p}><button onClick={() => {setCurrentPage(p)}}>{p}</button></li>
            })}
        </ul>
    </nav>
}