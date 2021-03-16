import React from "react";
import { Footer as FooterBox } from "grommet";
import { Box, Text } from "grommet";

const Footer = () => {
  return (
    <FooterBox
      background="dark-2"
      pad={{ horizontal: "large", vertical: "small" }}
    >
      <Box direction="row" gap="small">
        <Text alignSelf="center">영작연습소</Text>
      </Box>
      <Text textAlign="center" size="small">
        © 2021 Copyright
      </Text>
    </FooterBox>
  );
};

export default Footer;
