import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="5px">
      <Typography
        variant="h5"
        color={"#141414"}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={"#2196F3"}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
