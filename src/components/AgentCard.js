import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, CardMedia, Menu, MenuItem } from "@mui/material";
import {
  // Edit,
  // Visibility as Details,
  // Menu as MenuIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";

export default function AgentCard({
  agent: { name, sex, deleted },
  onEditAgent,
  onDeleteAgent,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuAction = (action) => () => {
    switch (action) {
      case "update":
        onEditAgent();
        break;
      case "disable":
        onDeleteAgent();
        break;
      default:
        break;
    }
    handleMenuClose();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
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
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            endIcon={<KeyboardArrowDown />}
            variant="outlined"
            size="small"
            id="demo-positioned-button"
            aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            onClick={handleMenuClick}
          >
            Actions
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleMenuAction("update")}>Edit</MenuItem>
            <MenuItem onClick={handleMenuAction("disable")}>
              Disable Agent
            </MenuItem>
          </Menu>
        </CardActions>
      </Box>
    </Card>
  );
}
