/*eslint-disable*/
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import background from "../assets/img/movie-banner.jpg"

import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";
import {Movies} from "../services/API/Movies"
import {RatingAPI} from "../services/API/Rating"
import Rating from "react-rating";

export default function Index() {
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [ratingArr, setRatingArr] = useState(null);

    const getRating = (id) => {
        let votes = 0;
        let score = 0;
        ratingArr.map((rating)=> {
            if (rating.movieId.toString() === id.toString()){
                votes++;
                score += rating.userRating;
            }
        })
        return score/votes
    };

    useEffect(() => {
        Movies.topRated()
            .then(response => {
                setTopRatedMovies(response.data.results);

                return RatingAPI.getAllRatings()
                    .then(response => {
                        console.log('ratings', response.data)
                        setRatingArr(response.data)
                    })
            })

    },[]);

    return (
        <>
            <IndexNavbar fixed/>
            <main className="profile-page pt-16">
                <section className="relative block h-500-px">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                `url(${background})`,
                        }}
                    >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-96">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            {/*<img*/}
                                            {/*    alt="..."*/}
                                            {/*    src={require("assets/img/team-2-800x800.jpg").default}*/}
                                            {/*    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"*/}
                                            {/*/>*/}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">

                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex  py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          Top Rated
                        </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap ">
                                        <div className="w-full lg:w-9/12 mx-32 ">
                                            <div className="w-full  px-4 ">
                                                <div className="flex flex-wrap">
                                                    <div className="w-full  px-4">
                                                        <ul
                                                            className="md:flex mb-0 list-none flex-wrap pt-6 pb-6 md:flex-row md:justify-between"
                                                        >
                                                        {topRatedMovies !== null ? topRatedMovies.map((movie, index) =>{
                                                                const {id, title, poster_path} = movie;

                                                                return <li className="w-48">
                                                                        <Link to={`/movies/${id}`} key={id}>
                                                                    <div className=" relative flex flex-col mt-4">
                                                                        <div className="px-4 py-5 flex-auto">
                                                                            <img
                                                                                alt="..."
                                                                                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                                                                                className="w-full align-middle rounded-lg"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <Rating
                                                                        emptySymbol={<i className="far fa-star"/>}
                                                                        fullSymbol={<i className="fas fa-star"/>}
                                                                        readonly
                                                                        placeholderRating={ratingArr !== null ? getRating(movie.id) : 0}
                                                                        placeholderSymbol={<i className="fas fa-star"/>}
                                                                    />
                                                                </Link>
                                                                </li>
                                                            }
                                                        ): null}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
