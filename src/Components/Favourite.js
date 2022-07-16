import React, { Component } from 'react'
import { movies } from './getMovies'

export default class extends Component {
    constructor(){
      super(); 
      this.state={
        genres:[] , 
        curgen : 'All Genre',
        movies:[] ,
        curtext : '' , 
        limit:5 , 
        currpage : 1
      }
    }

  componentDidMount(){
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let data = JSON.parse(localStorage.getItem("movies") || "[]") 

    let temp=[] 
    data.forEach((movieObj)=>{
      if(!temp.includes(genreids[movieObj.genre_ids[0]]))
          temp.push(genreids[movieObj.genre_ids[0]]);
    
    }) 
    temp.unshift('All Genre') ;
    this.setState({
      genres:[...temp] ,
      movies:[...data]
    })
  }
  handleGenreChange=(genre)=>{
    // console.log("hello")
    this.setState({
      curgen:genre

    })
  }

  sortPopularitydesc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objA , objB){
      return objB.popularity-objA.popularity
    })
    this.setState({
      movies:[...temp]
    })
  }

  sortPopularityasc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objB , objA){
      return objB.popularity-objA.popularity
    })
    this.setState({
      movies:[...temp]
    })
  }

  sortRatingdesc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objA,objB){
      return objB.vote_average-objA.vote_average
    })
    this.setState({
      movies:[...temp]
    })
  }

  sortPopularityasc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objB, objA){
      return objB.vote_average-objA.vote_average
    })
    this.setState({
      movies:[...temp]
    })
  }
  handlePageChange=(page)=>{
    this.setState({
      currpage :  page
    })
  }
    
  handleDelete=(id)=>{
    let newarr = [];
    newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
    this.setState({
        movies:[...newarr]
    })
    localStorage.setItem("movies-app",JSON.stringify(newarr))
  }
    render() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' }
    
    let filterarr = [];

      if(this.state.curtext==''){
          filterarr = this.state.movies
      }else{
        filterarr = this.state.movies.filter((movieObj)=>{
            let title = movieObj.original_title.toLowerCase();
            return title.includes(this.state.curtext.toLowerCase());
      })
      }

    // if(this.state.curgen=="All Genre"){ 
    //   filterarr = this.state.movies
    // }
    if(this.state.curgen!="All Genre"){
      filterarr = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.curgen)
    }

    let pages = Math.ceil(filterarr.length/this.state.limit);
    let pagesarr = [];
    for(let i=1; i<=pages; i++){
      pagesarr.push(i);
    }

    let si = (this.state.currpage-1)*this.state.limit;
    let ei = si+this.state.limit;
    filterarr = filterarr.slice(si,ei);
    return (
      
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul class="list-group favourite-genres">
                  {
                    this.state.genres.map((genre)=>(
                      this.state.curgen == genre ? 
                      <li class="list-group-item" style={{background:'#3f51b5' , color:'white' , fontWeight:'bold'}} >{genre}</li> :
                      <li class="list-group-item" style={{background:'white' , color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                    ))
                  }
                  
                  {/* <li class="list-group-item">Action</li>
                  <li class="list-group-item">Action</li>
                  <li class="list-group-item">Action</li>
                  <li class="list-group-item">Action</li> */}
                </ul>
              </div>
              <div className="col-lg-9 favourite-table col-sm-12">
                <div className="row">
                  <input type="text" className="input-group-text col" placeholder="Search" value = {this.state.curtext} onChange={(e)=>this.setState({curtext:e.target.value})}/>
                  <input type="number" className="input-group-text col " placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                </div>
                <div className="row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularitydesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityasc}></i></th>
                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingdesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingasc}></i></th>
                        
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filterarr.map((movieObj)=>(
                          <tr>
                            <td><img src={ `https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}} /> {movieObj.original_title}</td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average} </td>
                            <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>✖</button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {
                      pagesarr.map((page)=>(
                        <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                      ))
                    }
                    
                   
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    )
  }
}
