import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearnews, getNews } from "../store/newsSlice";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import loadingGif from "../assets/loading.gif";
export default function Home() {
  const dispatch = useDispatch();
  // It is going to display the error if it exists and also the loading and the news
  const { news, error, loading } = useSelector((state) => state.news);

  // It is wanted to use at the start of the app, so it is necessary to use useEffect
  // It is usually used for fecthing data from api
  // This is a hook in react, it is being used at the start of the application, especially to perfom fecthing from API
  useEffect(() => {
    dispatch(getNews());
    // When the page is left, news are cleared
    return () => {
      dispatch(clearnews());
    };
  }, []);
  return (
    <>
      <Typography
        variant="h1"
        color="secondary"
        style={{ textAlign: "center" }}
      >
        News
      </Typography>
      {/* In case of loading */}
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={loadingGif} />
        </Box>
      )}
      {/* In case of error */}
      {error && (
        <Typography variant="h2" color="error">
          {error}
        </Typography>
      )}{" "}
      <Box
        xs={{ d: "flex" }}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {/* If the news exists, it is wanted a map over them and it will be displayed each of them in a card */}
        {news?.map((item, index) => (
          <Card
            sx={{
              maxWidth: 345,
              m: 5,
              maxHeight: 600,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
            }}
            // It is used the index as key, because there is no id. All the news have the same id, so it is the same as there are no id.
            key={index}
          >
            {/* CardMedia is the image */}
            <CardMedia
              component="img"
              height="250"
              image={
                // If there is an image in the API: item?.urlToImage, if not it will be displayed the breakings news image that it is copied from internet
                item?.urlToImage ||
                "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
              }
              alt="img"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {/* slice until 50 character, if the title is longer, it will be not shown completed */}
                {item?.title.slice(0, 50)}
              </Typography>
              <Typography variant="body2" color="secondary">
                {item?.content}
              </Typography>
              <Typography>{item?.publishedAt}</Typography>
            </CardContent>
            {/* Containts the action that the cards have, the buttons in that caase */}
            <CardActions>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "100%",
                }}
              >
                <Button size="small">Share</Button>
                <Button size="small" href={item?.url} target="_blank">
                  Details
                </Button>
              </div>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}
