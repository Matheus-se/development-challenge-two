import { Theme } from "@mui/material";
import { Items } from "../models/Items.model";

export interface IJumbotronProps {
    color?: string;
    theme?: Theme;
    items?: Items[];
}