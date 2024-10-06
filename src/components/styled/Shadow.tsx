import styled from "@emotion/styled";
import React from "react";
import {css} from "@emotion/react";

type ShadowPropsType = {
    width?: string
    height?: string
    background?: string
    top?: string
    left?: string
    bottom?: string
    right?: string
    color?: string
    direction?: string
}

export const Shadow = styled.div<ShadowPropsType>`
    width: ${({width}) => width || "100%"};
    height: ${({height}) => height || "100%"};
    background: ${({
                       background,
                       color = "black 30%",
                       direction = "to top"
                   }) => background || `linear-gradient(${direction}, ${color}, transparent 100%)`};

    position: absolute;
    top: ${({top}) => top};
    left: ${({left}) => left};
    bottom: ${({bottom}) => bottom};
    right: ${({right}) => right};

    pointer-events: none;
    transition: 0.5s;
    z-index: 1;

`