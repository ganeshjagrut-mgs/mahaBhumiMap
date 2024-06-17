import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import MapComponent from "./MapComponent";

const Main = (props) => {
  const { data } = props;
  const plotCoordinates = data
    ? JSON.parse(data.plotCoordinates.replace(/(\w+):/g, '"$1":'))
    : [];

  const pinCoordinates = data
    ? JSON.parse(data.pinCoordinates.replace(/(\w+):/g, '"$1":'))
    : null;

  const plotNumber = data ? data.plotNumber : "";


  return (
    <div style={{ width: "100%" }}>
      <Card className="w-100 h-screen">
        <CardHeader
          className="w-full"
          avatar={<Avatar aria-label="recipe">{plotNumber}</Avatar>}
          action={
            <IconButton aria-label="settings">
              <i className="fas fa-ellipsis-v"></i>
            </IconButton>
          }
          title={data ? data.name : "No Plot Selected"}
          subheader={data ? data?.village?.name :""}
        />
        <hr className="p-2 m-2" />
        <CardContent className="text-center">
          {data ? (
            <div style={{ height: "800px", width: "100%" }}>
              <MapComponent
                plotCoordinates={plotCoordinates}
                pinCoordinates={pinCoordinates}
                plotNumber={plotNumber}
              />
            </div>
          ) : (
            "No Data Available"
          )}
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default Main;
