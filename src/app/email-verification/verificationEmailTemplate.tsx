//Defining the template in which the email will be sent.

import * as React from "react";
import { Html, Head, Font, Preview, Heading, Row, Section, Text } from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string
}

export const VerificationEmailTemplate = ({ username, otp }: VerificationEmailProps) => {
  
  return (
    <Html>
      <Head>
        <title>Verification Code </title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />      
      </Head>

      <Preview>Here$apos;s your verification code.</Preview>

      <Section>
          <Row>
            <Heading as="h2">Hello, {username}</Heading>
          </Row>
          <Row>
            <Text>Thankyou for registering. Please use the following registration code of verify your email:</Text>
          </Row>
          <Row>
            <Text>{otp}</Text>
          </Row>
          <Row>
            If you did not request this code, please Ignore this email
          </Row>
      </Section>

    </Html>
  );
};

export default VerificationEmailTemplate;
