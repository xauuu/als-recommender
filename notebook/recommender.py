from pyspark.sql import SQLContext
from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
import os
os.environ["JAVA_HOME"] = 'C:\Program Files\Java\jdk-20'

APP_NAME = "Recommender System"
COL_USER = "user_id"
COL_ITEM = "book_id"
COL_RATING = "rating"
MAX_ITER = 10
REG_PARAM = 0.1
RANK = 10

spark = SparkSession.builder\
    .master("local") \
    .appName(APP_NAME) \
    .getOrCreate()
sc = spark.sparkContext
sqlContext = SQLContext(sc)
ratings = spark.read.csv('D:/Python/Recomender/ALS/notebook/data/book/ratings.csv',
                         header=True, inferSchema=True)
books = spark.read.csv(
    'D:/Python/Recomender/ALS/notebook/data/book/books.csv', header=True, inferSchema=True)
books = books.withColumn('ratings_count', books['ratings_count'].cast('int'))
books = books.withColumn(
    'average_rating', books['average_rating'].cast('float'))
books = books.drop('book_id', 'work_id', 'isbn', 'isbn13', 'work_ratings_count',
                   'work_text_reviews_count', 'ratings_1', 'ratings_2', 'ratings_3', 'ratings_4', 'ratings_5')
book_tags = spark.read.csv('D:/Python/Recomender/ALS/notebook/data/book/book_tags.csv',
                           header=True, inferSchema=True)
tags = spark.read.csv(
    'D:/Python/Recomender/ALS/notebook/data/book/tags.csv', header=True, inferSchema=True)
training_df, validation_df = ratings.randomSplit([.8, 0.2])

als = ALS(maxIter=MAX_ITER, regParam=REG_PARAM, rank=RANK,
          userCol=COL_USER, itemCol=COL_ITEM, ratingCol=COL_RATING)
model = als.fit(ratings)

ALL_USER = model.recommendForAllUsers(10)
