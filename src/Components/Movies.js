import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
            hover : '',
            parr: [1] ,  
            currPage : 1 ,
            movies: [], 
            favourites : [] 
        }
    }
    async componentDidMount(){
        //side effects
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d3e2629303f68f4d7650413303b67a1b&page=${this.state.currPage}`);
        let data = res.data
        // console.log(data);   
        this.setState({
            movies:[...data.results]
        })
    }



changemovie=async()=>{
    console.log("changemovies called") ;
    let res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d3e2629303f68f4d7650413303b67a1b&page=${this.state.currPage}`);
      this.setState({
        movies:[...res.data.results],
      })
    }
    handleright=async()=>{
        // console.log("handle right called") ;
      let temp=[]
      for(let i =1;i<=this.state.parr.length+1;i++)
      {
            temp.push(i);
      }
      this.setState({
        parr:[...temp],
        currPage:this.state.currPage+1,
      },this.changemovie)
    }
    handleleft=async()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            }, this.changemovie)
        }
    }
    handleclick=(value)=>{
        if(value!=this.state.currPage){
            this.setState({
                currPage:value
            }, this.changemovie)
        }
    }
    handleFavourites=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie) 
        }
        localStorage.setItem("movies", JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouriteState();
    }
    handleFavouriteState=()=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
  render() {
    // let movie = movies.results
    return (
        <>
            {
                this.state.movies.length == 0 ?
                <div class="spinner-border text-primary" role="status">
                 <span class="sr-only">Loading...</span> 
                 </div> :
                 <div>
                    <h3 className = "text-center"><strong>𝕋𝕣𝕖𝕟𝕕𝕚𝕟𝕘 </strong></h3>
                    <div className="movies-list">
                        {
                            this.state.movies.map((movieObj)=>(
                                <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                             <img src={ `https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}   alt={movieObj.title} className="card-img-top movies-img"/>
                                {/* <div className="card-body"> */}
                             <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                            {/* <p class="card-text movies-text">{movieObj.overview}</p> */}
                            <div className="button-wrapper" style={{display:'flex' , width: '100%' , justifyContent: 'center'}}>
                                {
                                    this.state.hover == movieObj.id && <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from Favourites ♡" : "Add to Favourites ❤"}</a>
                                }
                            
                            {/* </div> */}
                            </div>
                             </div>
                            ))
                        }
                    </div>
                    <div style={{display: 'flex' , justifyContent: 'center'}}>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#" onClick={this.handleleft}>⏮</a></li>
                  
                        {
                            this.state.parr.map((value)=>(
                                <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handleclick(value)}>{value}</a></li>
                            ))
                        }
                    <li class="page-item"><a class="page-link"  href="#" onClick={this.handleright}>⏭</a></li>
                    </ul>
                    </nav>
                    </div>
                 </div>
        
            }
        </>
      
    )
  }
}
