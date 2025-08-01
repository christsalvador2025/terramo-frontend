import { Grid2 as Grid, Stack, Typography, TypographyProps } from "@mui/material";
import React, { ElementType } from "react";
import Search from "../search/search";
import Link from "next/link";

interface TitleBarProps {
  title: string;
  search: boolean;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleVariant?: TypographyProps["variant"];
  titleComponent?: ElementType;
  children?: React.ReactNode;
}

const TitleBar = ({
  title,
  search,
  onSearchChange,
  titleVariant = "h1",
  titleComponent = "h1",
  children,
}: TitleBarProps) => {
  return (
    <Grid
      container
      spacing={2}
      mt={1}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ marginBottom: "1rem" }}
    >
      <Typography variant={titleVariant} component={titleComponent} mb={2} style={{fontSize: '3rem',fontWeight: '300',
    lineHeight: '1.167',
    marginBottom: '16px'}}>
        {title}
      </Typography>
      {children && children}
      

      {/* Kunde anlegen */}
      <Stack  direction="row" alignItems="center" spacing={3}>
        {search && onSearchChange && <Search onSearchChange={onSearchChange} />}
      <Link
        href="/clients/create-client"
        className="flex items-center bg-[#026770] text-sm text-[#ffff] hover:no-underline p-[8px] rounded"
      >
        Kunde anlegen
      </Link>
      </Stack>
      
    </Grid>
  );
};
export default TitleBar;
