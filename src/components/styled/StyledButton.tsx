import styled from "@emotion/styled";
import {Button} from "@mui/material";


export const StyledButton = styled(Button)({
    maxWidth: "270px",
    width: "100%",
    borderRadius: "50px",
    textTransform: "none",
    fontSize: "22px",
    position: "absolute",
    bottom: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2
})