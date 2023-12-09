import {
  Box,
  Heading,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react'
import OrgDetailsModal from './OrgDetailsModal.jsx'

export const LandingHero = () => {
  return (
    <Stack
      px={8}
      py={24}
      mx='auto'
      w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
      spacing={{ base: '4', lg: '8' }}
    >
      <Heading
        mb={6}
        fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
        fontWeight='bold'
        lineHeight='none'
        textAlign='center'
        letterSpacing={{ base: 'normal', md: 'tight' }}
        color='gray.600'
        _dark={{
          color: 'gray.100',
        }}
      >
        Make{' '}
        <Text
          display='inline'
          w='full'
          bgClip='text'
          bgGradient='linear(to-r, green.400,purple.500)'
          fontWeight='extrabold'
        >
          your events{' '}
        </Text>
        get more{' '}
        <Text
          display='inline'
          w='full'
          bgClip='text'
          bgGradient='linear(to-r, green.400,purple.500)'
          fontWeight='extrabold'
        >
          reach
        </Text>{' '}
        ...
      </Heading>

      <chakra.p
        mb={6}
        fontSize={{ base: 'lg', md: 'xl' }}
        color='gray.600'
        _dark={{
          color: 'gray.300',
        }}
        textAlign='center'
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore maxime
        autem minima. Reprehenderit beatae quasi, atque quos molestiae veritatis
        ipsam quia soluta sit! Quis excepturi laboriosam consequatur incidunt
        minus molestiae!
      </chakra.p>
      <Box
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <OrgDetailsModal />
      </Box>
    </Stack>
  )
}
