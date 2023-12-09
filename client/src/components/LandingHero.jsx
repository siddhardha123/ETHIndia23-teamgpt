import { Box, Text, VStack, Heading } from '@chakra-ui/react'
import OrgDetailsModal from './OrgDetailsModal.jsx'

export const LandingHero = () => {
  return (
    <Box textAlign='center' py='9rem' color='white'>
      <VStack spacing='5' mb='4rem'>
        <Heading as='h1' size='4xl' fontWeight='extrabold'>
          Make your events get more
        </Heading>
        <Heading as='h1' size='4xl' fontWeight='extrabold'>
          Reach
        </Heading>
        <Text>Something goes in here...</Text>
      </VStack>
      <Text fontSize={{ sm: 'sm', md: 'xl' }} color='zinc.400'>
        Another bunch of text here
      </Text>
      <Box style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
        <OrgDetailsModal />
      </Box>
    </Box>
  )
}
