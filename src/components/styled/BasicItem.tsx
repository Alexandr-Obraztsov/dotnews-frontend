import styled from "@emotion/styled";
import {globalTheme} from "../../globalTheme";
import {ButtonHTMLAttributes, FC} from "react";

type BasicItemPropsType = ButtonHTMLAttributes<HTMLDivElement>

export const BasicItem: FC<BasicItemPropsType> = (props) => {


    return (
        <StyledBasicItem {...props}>
            {props.children}
        </StyledBasicItem>
    );
}

export const StyledBasicItem = styled.div({
    position: "relative",
    display: "flex",
    padding: "10px 15px",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: globalTheme.palette.background.paper,
    overflow: "hidden",
})