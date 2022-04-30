import React, { useEffect, useState } from 'react'
import { API_KEY, MOVIE_API } from '../../config';
import MovieCard from '../../components/movieCard';
import FeaturedHome from './firstImage';

import classes from './home.module.css';
import Loading from '../../components/loading';


const HomePage = () => {


  const [categories, setCategories] = useState("popular");
  const [loading, setLoading] = useState(false);

  const [homeData, setHomeData] = useState([]);
  const [categoriesName, setCategoriesName] = useState("Trending");
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  const handleCategories = (e)=>{
    setCategories(e.target.value);
  }


  useEffect(()=>{
    
    setLoading(true)
    const fetchMovie = async()=>{
      if(searchValue){
        const res = await fetch(`${MOVIE_API}search/movie?api_key=${API_KEY}&page=${page}&query=${searchValue}`);
        const data = await res.json();
        setCategoriesName("Search")
        if(data.results && !pageInfo){
          setHomeData(prevState=>{
            return [ ...data.results]
          })
        }
        if( data.results && pageInfo){
          setHomeData(prevState=>{
            return [ ...prevState, ...data.results]
          })
          setPageInfo(false);
        }
        setLoading(false);
        return;
      }
      const res = await fetch(`${MOVIE_API}movie/${categories}?api_key=${API_KEY}&page=${page}`);
      const data = await res.json();  
      if(data.results && !pageInfo){
        setHomeData(prevState=>{
          return [ ...data.results]
        })
      }

      if( data.results && pageInfo){
        setHomeData(prevState=>{
          return [ ...prevState, ...data.results]
        })
        setPageInfo(false);
      }
      setLoading(false);
    }
    fetchMovie();

  },[categories, page, searchValue])

  const handlePage = ()=>{
    setPage(()=>page + 1);
    setPageInfo(true);
  }



  useEffect(()=>{
    if(categories){
      switch (categories) {
        case "popular":
          setCategoriesName("Trending")
          return;
        case "latest":
          setCategoriesName("Latest");
          return;
        case "top_rated":
          setCategoriesName("Top Rated");
          return;
        case "now_playing":
          setCategoriesName("Now Playing");
          return;
        case "upcoming":
          setCategoriesName("Upcoming");
          return;
        default:
          setCategoriesName("Trending");
          return;
      }
    }
  },[categories])
  return (
    <section className={classes.home_container}>
      <section className={classes.home_container_child}>
        <FeaturedHome />
        <section className={classes.home_body_section}>
          <header className={classes.home_body_header}>
            <div className={classes.header}>
              <span className={classes.span}>
              Find More Movies
              </span>
            </div>
            <section className={classes.header_body}>
              <div className={classes.header_form}>
                <form>
                  <input 
                    type={"search"} 
                    id="search" 
                    value={searchValue} 
                    name='search' 
                    placeholder='Search here' 
                    onChange={(e)=>setSearchValue(e.target.value)}
                  />
                </form>
              </div>
              <div className={classes.filter}>
                <form>
                  <select name='categories' id='categories' onChange={handleCategories} value={categories} className={classes.categories}>
                    <option value={'popular'}>Trending</option>
                    <option value={"latest"}>Latest</option>
                    <option value={"top_rated"}>Top Rated</option>
                    <option value={"now_playing"}>Now Playing</option>
                    <option value={"upcoming"}>Upcoming</option>
                  </select>
                </form>
              </div>
            </section>
            
            <section className={classes.movie_category_title}>
              <span>{categoriesName}</span>
            </section>
          </header>


          <section className={classes.body}>
            {
              loading && <Loading />
            }
            { !loading && homeData &&
              homeData.map((movie, key)=>{
                return(
                  <MovieCard 
                    title={movie.title}
                    duration={movie.duration}
                    release_date={movie.release_date}
                    image={movie.image}
                    vote_average={movie.vote_average}
                    backdrop_path={movie.backdrop_path}
                    id={movie.id}
                    key={key}
                  />
                )
              })
            }
          </section>
          <section className={classes.load_more}>
            <button onClick={handlePage}>Load More</button>
          </section>
        </section>
      </section>
    </section>
  )
}

export default HomePage