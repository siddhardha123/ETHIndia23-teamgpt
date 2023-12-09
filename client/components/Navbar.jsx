import {
  Flex,
  Box,
  Link as ChakraLink,
  Heading,
  Image,
  HStack,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const LandingNavbar = () => {
  return (
    <HStack
      style={{
        display: 'flex',
        width: '98vw',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <ChakraLink href='/' style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          height='16'
          width='16'
          alt='Logo'
          src='https://assets-global.website-files.com/61fc15c0f8310d584dfc683b/64f2b538468c25972d5edb81_Frame%20512918836.svg'
          style={{
            borderRadius: '50px',
            marginRight: '10px',
            border: '2px solid white',
          }}
        />
        <Heading as='h1' fontSize='3xl' fontWeight='bold'>
          <Box as='span' color='white'>
            Out
          </Box>
          <Box as='span' color='#fe8400'>
            Reach
          </Box>
        </Heading>
      </ChakraLink>
      <Flex align='center' gap={5}>
        <ConnectButton />
      </Flex>
    </HStack>
  )
}

export default LandingNavbar
