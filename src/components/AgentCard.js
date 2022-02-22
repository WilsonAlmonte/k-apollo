import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, CardMedia } from "@mui/material";
import { Edit, Visibility as Details } from "@mui/icons-material";

export default function AgentCard({ agent: { name, sex, deleted } }) {
  const image = require(`../assets/images/avatar-${sex}.png`);
  return (
    <Card
      sx={{ display: "flex", minWidth: "350px", mb: 2, position: "relative" }}
    >
      <CardMedia
        component="img"
        sx={{ width: 140, padding: 1 }}
        image={image}
        alt={`Agent: ${name} ${sex}`}
      ></CardMedia>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color={deleted ? "text.disabled" : "secondary"}
            sx={{ fontWeight: "600" }}
            component="div"
          >
            {!deleted ? "ACTIVE" : "INACTIVE"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" startIcon={<Edit />}>
            Edit
          </Button>
          <Button size="small" variant="outlined" startIcon={<Details />}>
            Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
