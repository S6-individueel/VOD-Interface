import React, {useEffect, useState} from "react";
import {AzureMP} from 'react-azure-mp'
import background from "../../assets/img/movie-banner.jpg";
import Rating from "react-rating";

import {useParams} from 'react-router-dom'
import {Movies} from "../../services/API/Movies";
import {Comment} from "../../services/API/Comment";
import {RatingAPI} from "../../services/API/Rating";
import jwt from "jsonwebtoken";

export default function Movie() {
    const params = useParams();
    const id = params.movieId;
    const [movie, setMovie] = useState(null);
    const [disable, setDisable] = useState(localStorage.getItem("token") === null);
    const [comment, setComment] = useState({userId: '', movieId: '', userComment: ''});
    const [commentArr, setCommentArr] = useState([]);
    const [commentShow, setCommentShow] = useState(5);
    const [errors, setErrors] = useState({errors: []});
    const [errorMessage, setErrorMessage] = useState();
    const [rating, setRating] = useState(null);
    const [edit, setEdit] = useState(null);
    const [movieRating, setMovieRating] = useState({score: 0, votes: 0});

    useEffect(() => {

        let requestedMovieId = null;
        Movies.topRated()
            .then(response => {
                console.log('movie results', response.data.results);
                console.log('id', id);
                response.data.results.map((movie, index) => {
                    if (movie.id.toString() === id) {
                        setMovie(movie);
                        setComment({...comment, movieId: movie.id})
                    }
                });
                return Comment.getCommentsByMovieId(id)
                    .then(response => {
                        setCommentArr(response.data.reverse());
                        return RatingAPI.getRatingsByUserId()
                            .then(response => {
                                response.data.map((rating, index) => {

                                    if (rating.movieId.toString() === id) {
                                        setRating({userRating: rating.userRating, id: rating.id})
                                    }
                                })
                                return RatingAPI.getRatingsByMovieId(id)
                                    .then(response => {
                                        let votes = 0;
                                        let score = 0;

                                        response.data.map((rating, index) => {
                                            votes++;
                                            score += rating.userRating
                                        })
                                        setMovieRating({score: score / votes, votes: votes})
                                    })
                            })
                    })
            })
    }, []);

    const onCommentChange = (e) => {
        setComment({...comment, userComment: e.target.value});
        clearValidationErr('comment')
    };

    function showValidationErr(elm, msg) {
        setErrors((prevState) => ({errors: [...prevState.errors, {elm, msg}]}));
    }

    function clearValidationErr(elm) {
        setErrors((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err)
                }
            }
            return {errors: newArr}
        });
    }

    let commentErr = null;

    for (let err of errors.errors) {
        if (err.elm === 'comment') {
            commentErr = err.msg
        }
    }

    const onCommentSubmit = () => {
        if (comment.userComment === '') {
            showValidationErr('comment', 'Comment cannot be empty!')
        } else {
            if (edit !== null) {
                Comment.modifyComment(edit.comment.id,{userComment: comment.userComment}).then(response => {
                    showValidationErr('comment', 'Comment has been edited!')
                    return Comment.getCommentsByMovieId(id)
                        .then(response => {
                            setCommentArr(response.data.reverse());
                            setEdit(null);
                        })
                });
            } else {
                Comment.addComment(comment).then(response => {
                    showValidationErr('comment', 'Comment has been posted!')
                    return Comment.getCommentsByMovieId(id)
                        .then(response => {
                            setCommentArr(response.data.reverse())
                        })
                });
            }

        }
    };

    const commentRender = () => {
        setCommentShow(commentShow + 5)
    };

    const onCommentDelete = (id) => {
        let newArr = [...commentArr];
        newArr.map((comment, index) => {
            if (comment.id === id) {
                newArr.splice(index, 1)
            }
        });
        Comment.deleteComment(id)
            .then(response => {
                setCommentArr(newArr);
                showValidationErr('comment', 'Comment has been deleted!')
            })
    };

    const commentRows = () => {
        let newArray = [];
        let int = 0;

        commentArr.map((comment, index)=> {
            if (int < commentShow){
                if (commentArr !== undefined) {
                    newArray.push(<tr key={comment.userId + int}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div
                                    className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={require("../../assets/img/default-avatar.png").default}
                                        alt=""/>
                                </div>
                                <div className="ml-4">
                                    <div

                                        className="text-sm font-medium text-gray-900">{comment.userId}
                                        {comment.userId === jwt.verify(localStorage.getItem("token").split("Bearer ").pop(), "Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==").id ?
                                            <>
                                                <i className="far fa-edit text-blueGray-400 ml-2 cursor-pointer hover:text-indigo-500" onClick={() => onCommentEdit(comment)}></i>
                                                {" "}
                                                <i className="far fa-trash-alt text-blueGray-400 cursor-pointer hover:text-indigo-500" onClick={() => onCommentDelete(comment.id)}/>
                                            </>
                                            : null}
                                    </div>
                                    <div
                                        className="text-sm text-gray-500">{comment.userComment}</div>
                                </div>
                            </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">

                        </td>

                    </tr>)
                }
                int++;
            }
        })
        return newArray
    };

    const onRatingSubmit = (e) => {
        if (localStorage.getItem('token') !== null) {
            if (rating !== null) {
                RatingAPI.modifyRating(rating.id, {userRating: e}).then(response => {
                    setRating({userRating: e, id: rating.id})
                    return RatingAPI.getRatingsByMovieId(id)
                        .then(response => {
                            let votes = 0;
                            let score = 0;

                            response.data.map((rating, index) => {
                                votes++;
                                score += rating.userRating
                            })
                            setMovieRating({score: score / votes, votes: votes})
                        })
                });

        } else {
            RatingAPI.addRating({movieId: id, userRating: e}).then(response => {
                setRating({...rating, userRating: e});
                return RatingAPI.getRatingsByMovieId(id)
                    .then(response => {
                        let votes = 0;
                        let score = 0;

                        response.data.map((rating, index) => {
                            votes++;
                            score += rating.userRating
                        })
                        setMovieRating({score: score / votes, votes: votes})
                    })
            });
        }
    }
    };

    const onCommentEdit = (editedComment) => {
        setEdit({comment: editedComment , edit: true})
        setComment({...comment, userComment: editedComment.userComment});
    };

    return (
        <>
            <main className="profile-page">
                <section className="relative block h-500-px">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage: movie !== null ? `url(https://image.tmdb.org/t/p/original/${movie.poster_path})` : null
                            ,
                        }}
                    >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{transform: "translateZ(0)"}}
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
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-96">
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
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"/>

                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {movieRating.votes}
                        </span>
                                                <span className="text-sm text-blueGray-400">
                          Votes
                        </span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {commentArr !== undefined ? commentArr.length : 0}
                        </span>
                                                <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {movieRating.score}
                        </span>
                                                <span className="text-sm text-blueGray-400">
                          Score
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {movie !== null ? movie.title : null}
                                    </h3>

                                    <div style={{
                                        width: "900px",
                                        height: "500px",
                                        display: "inline-block"
                                    }} className="mt-10 bg-black">
                                        {/*<AzureMP*/}
                                        {/*    skin="amp-flush"*/}
                                        {/*    options={{autoplay: false}}*/}
                                        {/*    src={[{*/}
                                        {/*        src: "https://vodmedia-euwe.streaming.media.azure.net/78f5f043-2921-4c2f-a0c4-e6dbe9daa7ae/test.ism/manifest(format=m3u8-cmaf) https://vodmedia-euwe.streaming.media.azure.net/78f5f043-2921-4c2f-a0c4-e6dbe9daa7ae/test.ism/manifest",*/}
                                        {/*        type: "application/vnd.ms-sstr+xml"*/}
                                        {/*    }]}*/}
                                        {/*/>*/}
                                    </div>

                                    <div
                                        className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase mt-10">
                                        release date - {movie !== null ? movie.release_date : null}
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        {movie !== null ? movie.overview : null}
                                    </div>

                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 ">
                                    <div className="flex flex-wrap ">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <Rating

                                                fractions={1}
                                                emptySymbol={<i className="far fa-star"/>}
                                                fullSymbol={<i className="fas fa-star"/>}
                                                disabled
                                                onChange={(e) => onRatingSubmit(e)}
                                                readonly={localStorage.getItem('token') === null}
                                                placeholderRating={rating !== null ? rating.userRating : 0}
                                                placeholderSymbol={<i className="fas fa-star"/>}
                                            />
                                            <div className="text-right ">
                                                <div className="mt-1">

                      <textarea
                          id="about"
                          name="about"
                          value={edit !== null ? comment.userComment : null}
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={disable ? "Login to add a public comment and rating..." : "Add a public comment..."}
                          defaultValue={''}
                          disabled={disable}
                          onChange={e => onCommentChange(e)}
                      />
                                                    <small
                                                        className='danger-error text-red-500'>{commentErr ? commentErr : ''}</small>
                                                </div>
                                                <button
                                                    className="font-normal text-lightBlue-500 "
                                                    onClick={() => onCommentSubmit()}
                                                    disabled={disable}
                                                >
                                                    Send
                                                </button>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                    <div
                                                        className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                        <div className=" overflow-hidden  sm:rounded-lg">
                                                            <table className="min-w-full ">
                                                                <tbody className="bg-white ">
                                                                {commentArr.length !== 0 ?
                                                                    commentRows() : null}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center">
                                                <a
                                                    href="#pablo"
                                                    className="font-normal text-lightBlue-500 transition-all"
                                                    onClick={(e) => commentRender()}
                                                >
                                                    Show more
                                                </a>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
