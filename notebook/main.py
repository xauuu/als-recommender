from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from recommender import ratings, books, book_tags, tags, model
from fastapi import Response
from pyspark.sql.functions import explode, collect_list
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/book_detail/{book_id}")
async def get_book_detail(book_id: int):
    # Get book detail
    book_detail = get_tags(books.filter(
        books.id == book_id)).take(1)[0].asDict()

    return Response(content=json.dumps(book_detail), media_type="application/json")


@app.get("/books_by_popularity/{limit}")
async def get_books_by_popularity(limit: int):
    # Get books by popularity and rating

    popular_books = get_tags(books.orderBy(
        ['ratings_count', 'average_rating'], ascending=False).limit(limit)).toPandas()

    return Response(content=popular_books.to_json(orient="records"), media_type="application/json")


@app.get("books_newest/{limit}")
async def get_books_newest(limit: int):
    # Get books by newest

    newest_books = get_tags(books.orderBy(
        'original_publication_year', ascending=False).limit(limit)).toPandas()

    return Response(content=newest_books.to_json(orient="records"), media_type="application/json")


@app.get("/books_rated_by_user/{user_id}")
async def get_books_rated_by_user(user_id: int):
    # Get books rated by user
    books_rated_by_user = ratings.filter(
        ratings.user_id == user_id).select('book_id')
    books_rated_by_user = get_tags(books_rated_by_user.join(
        books, books.id == books_rated_by_user.book_id)).toPandas()

    return Response(content=books_rated_by_user.to_json(orient="records"), media_type="application/json")


@app.get("/recommendations/{user_id}")
async def get_recommendations(user_id: str):
    # Get recommendations for user
    recommendations = get_rec(model.recommendForUserSubset(
        ratings.filter(ratings.user_id == user_id), 10))
    recommendations = get_tags(recommendations.join(
        books, books.id == recommendations.book_id)).toPandas()

    return Response(content=recommendations.to_json(orient="records"), media_type="application/json")


def get_tags(books):
    new_books = books.join(
        book_tags, book_tags.goodreads_book_id == books.best_book_id)
    new_books = new_books.join(tags, tags.tag_id == book_tags.tag_id)
    new_books = new_books.groupBy(books.columns).agg(
        collect_list(tags.tag_name).alias('tags'))
    return new_books


def get_rec(rec):
    new_rec = rec.select("user_id", explode(rec.recommendations).alias("rec"))
    rating_mat = new_rec.select(['rec.book_id', 'rec.rating'])
    return rating_mat
