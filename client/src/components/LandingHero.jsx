import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react'
import OrgDetailsModal from './OrgDetailsModal.jsx'
import { useEffect, useState } from 'react'
import Card from './Card.jsx'

export const LandingHero = () => {
  const [orgs, setOrgs] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/api/orgs').then((response) =>
      response.json().then((data) => {
        setOrgs(data)
      })
    )
  })

  return (
    <Stack
      px={8}
      py={24}
      mx='auto'
      mt='10vh'
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
        get the{' '}
        <Text
          display='inline'
          w='full'
          bgClip='text'
          bgGradient='linear(to-r, green.400,purple.500)'
          fontWeight='extrabold'
        >
          reach
        </Text>{' '}
        you want it to get...
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
      <Heading
        mb={6}
        mt='10vh'
        fontSize={{ base: '2xl', md: '4xl', lg: '6xl' }}
        fontWeight='bold'
        lineHeight='none'
        textAlign='center'
        letterSpacing={{ base: 'normal', md: 'tight' }}
        color='gray.600'
        _dark={{
          color: 'gray.100',
        }}
      >
        Orgs that have already registered with us!
      </Heading>
      <Flex flexWrap='wrap' justifyContent='center'>
        {orgs.map((org) => (
          <Box
            key={org._id}
            maxW='md'
            width={{ base: '100%', md: '60%' }}
            margin='2'
          >
            <Card
              name={org.name}
              description={org.description}
              socialLinks={org.social_links}
              profileImage={org.profile_image}
              walletAddress={org.wallet_address}
            />
          </Box>
        ))}
      </Flex>
    </Stack>
  )
}
