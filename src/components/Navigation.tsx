import { Anchor, Box, Grommet, Header, Menu, ResponsiveContext } from "grommet";
import { SettingsOption } from "grommet-icons";
import React, { useState, useEffect } from "react";
import { defaultTheme } from "../theme";

const Navigation = () => {
  return (
    <Grommet theme={defaultTheme}>
      <Header background="white" pad="medium" height="xsmall">
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <Box justify="end">
                <Menu
                  a11yTitle="Navigation Menu"
                  dropProps={{ align: { top: "bottom", right: "right" } }}
                  icon={<SettingsOption color="brand" />}
                  items={[
                    {
                      label: <Box pad="small">랜덤 문제</Box>,
                      href: "#",
                    },
                    {
                      label: <Box pad="small">테마 문제</Box>,
                      href: "#",
                    },
                  ]}
                />
              </Box>
            ) : (
              <>
                <Anchor
                  href="/"
                  label="영작연습소"
                  color="#030303"
                  className="font-gothic"
                />
                <Box justify="end" direction="row" gap="medium">
                  <Anchor href="#" label="랜덤 문제" className="font-gothic" />
                  <Anchor href="#" label="테마 문제" className="font-gothic" />
                </Box>
              </>
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
    </Grommet>
  );
};

export default Navigation;
