
export default function Search({search, setSearch, handleCitySearch}){

    
    return <div className="search-engine">
        <input 
        type="text" 
        className="city-search"
        placeholder="Enter city name.."
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>

        <button onClick={handleCitySearch} >Search</button>

    </div>
}