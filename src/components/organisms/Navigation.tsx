import { Anchor, Box, Grommet, Header, Menu, ResponsiveContext } from "grommet";
import { SettingsOption } from "grommet-icons";
import React, { useState, useEffect } from "react";
import { defaultTheme } from "../../theme";

const list = [
  1,
  2,
  3,
  4,
  5,
  6,
  63,
  7,
  59,
  60,
  61,
  62,
  64,
  12,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  43,
  46,
  47,
  48,
  53,
];

const Navigation = () => {
  const ranmdomNumber = Math.floor(Math.random() * 100) % list.length;
  const randomLink = `practice?numid=${list[ranmdomNumber]}`;
  return (
    <Grommet theme={defaultTheme}>
      <Header background="white" pad="medium" height="xsmall">
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <>
                <Anchor
                  href="/"
                  label="Hello, Jennie."
                  color="#030303"
                  className="font-gothic"
                />
                <img src="/logo.png" width="120" />
                <Box justify="end" direction="row" gap="medium">
                  <Menu
                    a11yTitle="Navigation Menu"
                    dropProps={{ align: { top: "bottom", right: "right" } }}
                    icon={<SettingsOption color="brand" />}
                    items={[
                      {
                        label: <Box pad="small">랜덤 문제</Box>,
                        href: randomLink,
                      },
                      {
                        label: <Box pad="small">테마 문제</Box>,
                        href: randomLink,
                      },
                    ]}
                  />
                </Box>
              </>
            ) : (
              <>
                <Anchor
                  href="/"
                  label="Hello, Jennie."
                  color="#030303"
                  className="font-gothic"
                />
                <img src="/logo.png" width="120" />
                <Box justify="end" direction="row" gap="medium">
                  <Anchor
                    href={randomLink}
                    label="랜덤 문제"
                    className="font-gothic"
                  />
                  <Anchor
                    href={randomLink}
                    label="테마 문제"
                    className="font-gothic"
                  />
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
