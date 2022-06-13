import { Grid, Grow } from "@mui/material";
import { IJumbotronProps } from "../../data/interfaces/IJumbotronProps.interface";
import { JumbotronSnackContainer } from "../../styles/components/jumbotron/style";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";

const JumbotronSnack: React.FC<IJumbotronProps> = ({items, theme}) => {
    const [transition, setTransition] = useState<{[key: number]: boolean}>({0: true});

    return (
        <JumbotronSnackContainer color={theme?.palette.primary.main}>
            <Grid 
                container 
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={10}
                className="grid"
            >
                {
                    items?.map((item, i) => {
                        return (
                            <Grow
                                key={i}
                                in={transition[i]}
                                onEntered={() => setTransition(prev => ({...prev, [i+1]: true}))}
                                timeout={500}
                            >
                                <Grid 
                                    item 
                                    xs={12/items?.length}
                                    justifyContent="center"
                                    alignItems="center"
                                    className="grid"
                                >
                                    <div className="container">   
                                        {item.image}
                                    </div>
                                    <br/>
                                    <div className="typography-container">
                                        <Typography fontSize={15} color="white" className="text title">
                                            {item.title}
                                        </Typography>
                                        <Typography fontSize={13} color={grey[500]} className="text">
                                            {item.description}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grow>
                        )
                    })
                }
            </Grid>
        </JumbotronSnackContainer>
    )
}

export default JumbotronSnack;