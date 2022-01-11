import {
  Box,
  Button,
  Flex,
  Input,
  Center,
  Text,
  useColorMode
} from '@chakra-ui/react'
import login from 'api/login'
import { useEffect, useState } from 'react'

const containerStyle = {
  position: 'fixed',
  h: 'full',
  w: 'full',
  backgroundImage: '/shapes-bg-color.png',
  backgroundSize: '70%'
}


const inputBoxStyle = {
  my: 2
}
const labelStyle = {
  color: 'gray.500',
  mb: 2,
  display: 'block',
  fontWeight: 'semibold',
  cursor: 'pointer',
  fontSize: 'sm'
}

function Card ({children}) {
  const {colorMode} = useColorMode()
  const isDark = colorMode == 'dark'

  const cardStyle = {
    minW: 'sm',
    maxW: 'sm',
    p: 8,
    py: 12,
    rounded: 10,
    border: '1px',
    backgroundColor: isDark && 'gray.800' || 'white',
    borderColor: isDark && 'gray.700' || 'gray.100'
  }
  return <Box {...cardStyle}>{children}</Box>
}

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const handleIdentifier = ({target}) => {
    const {value} = target
    console.log(value);
  }
  const handlePassword = e => {
    console.log(e);
  }
  return (
    <Center {...containerStyle}>
      <Card>
        <Text fontSize="4xl">Sign in</Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">Continue with your account</Text>
        <Flex direction="column" mt={4}>
          <Box {...inputBoxStyle}>
            <Text {...labelStyle} as="label" htmlFor="identifier">Your email or username</Text>
            <Input onChange={handleIdentifier} type="text" id="identifier" />
          </Box>
          <Box {...inputBoxStyle}>
            <Text {...labelStyle} as="label" htmlFor="password">Your password</Text>
            <Input onChange={handlePassword} type="password" id="password" />
          </Box>
          <Button mt="8" type="submit">Continue</Button>
        </Flex>
      </Card>
    </Center>
  )
}