import * as React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import {tg} from "../../../globalTheme";
import {TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {updateUserDigestNameAC} from "../../../store/userReducer";
import {useParams} from "react-router-dom";
import {updateDigestAPI} from "../../../api/digestsAPI";



export const EditableDigestName : React.FC = () => {
    const {digestId = ""} = useParams()

    const digest = useAppSelector(state => state.user.digests).find(dg => dg.id === digestId)!;
    const [isEdit, setIsEdit] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()

    const onDigestNameChange = () => {
        const name = inputRef.current!.value
        setIsEdit(false);
        dispatch(updateUserDigestNameAC({digest, name}))
        updateDigestAPI({telegramId: tg.initDataUnsafe.user!.id, digestId, name, timeInterval: digest.timeInterval})
    }

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") onDigestNameChange()
    }

    if (isEdit) {
        return (
            <TextField
                inputRef={inputRef}
                defaultValue={digest.name}
                autoFocus={true}
                onKeyUp={onKeyUpHandler}
                onBlur={onDigestNameChange}
                sx={{
                    "& input": {
                        width: "100%",
                        height: "min-content",
                        textAlign: "center",
                        border: "none",
                        fontWeight: 450,
                        lineHeight: "normal",
                        fontSize: "20px",
                        padding: "0 20px"
                    },
                    "& fieldset": {
                        border: "none",
                        padding: 0
                    }
                }}
            />
        );
    }
    return (
        <Typography
            fontWeight={450}
            lineHeight={"normal"}
            fontSize={"20px"}
            onClick={() => setIsEdit(true)}
            sx={{
                display: "flex",
                alignItems: "center",
                position: "relative"
            }}
        >
            {digest.name}
            <EditIcon
                sx={{
                    fontSize: "15px",
                    color: tg.themeParams.subtitle_text_color,
                    position: "absolute",
                    right: "-20px"
                }}
            />
        </Typography>
    );
};