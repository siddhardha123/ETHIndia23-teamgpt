import {
  Box,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import OrgDetailsModal from './OrgDetailsModal.jsx'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const LandingHero = () => {
  // const [orgs, setOrgs] = useState([])
  const { address } = useAccount()
  const [file, setFile] = useState(false)

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile) // Save the file to the state
      toast.success(`${uploadedFile.name} has been uploaded successfully.`)
      setFile(true);
    }
  }

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/orgs').then((response) =>
  //     response.json().then((data) => {
  //       setOrgs(data)
  //     })
  //   )
  // })

  return (
    <Stack
      px={8}
      py={0}
      mx='auto'
      mt='10vh'
      w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
      spacing={{ base: '4', lg: '8' }}
    >
      <ToastContainer />
      <HStack display='flex' justifyContent='center'>
        <Text
          w='600px'
          color='#FFF'
          textAlign='center'
          fontSize='70px'
          fontWeight='900'
          lineHeight='normal'
          letterSpacing='0.7px'
        >
          Vampire Attacks Simplified
          <span style={{ color: 'yellow' }}>.</span>
        </Text>
      </HStack>
      <HStack display='flex' justifyContent='center'>
        <Text
          w='600px'
          color='#FFF'
          textAlign='center'
          fontSize='18px'
          lineHeight='normal'
          letterSpacing='0.7px'
        >
          Effortlessly Target and Airdrop NFTs to your competitors&apos; power users
        </Text>
      </HStack>

      <Box
        w='70vw'
        h='70px'
        display='flex'
        justifyContent='space-between'
        p='20px'
        alignItems='center'
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '50px',
        }}
        cursor={!address && 'not-allowed'}
        opacity={!address && '15%'}
      >
        <Box
          w='250px'
          h='50px'
          display='flex'
          justifyContent='center'
          alignItems='center'
          cursor={address && 'pointer'}
        >
          <label
            htmlFor='file-upload'
            style={{ cursor: `${address && 'pointer'}` }}
          >
            {file ? (
              <Box border='1px solid green' borderRadius='25px' padding='10px' ml='-30px'>
                <Text fontSize='20px' color='green.400'>
                  File uploaded
                </Text>
              </Box>
            ) : (
              <Text fontSize='20px' color='white'>
                + Upload your Allowlist
              </Text>
            )}
          </label>
          <input
            id='file-upload'
            type='file'
            accept='.csv'
            disabled={!address}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </Box>
        <Box
          w='150px'
          h='50px'
          style={{
            backgroundColor: '#8575FF',
            borderRadius: '50px',
          }}
          display='flex'
          justifyContent='center'
          alignItems='center'
          cursor={address && 'pointer'}
        >
          <Text color='white' onClick={() => window.open('/dashboard')}>
            Inspect
          </Text>
        </Box>
      </Box>

      <HStack>
        <Box
          maxW='xs'
          overflow='hidden'
          p={6}
          m={4}
          bg='gray.700'
          background='rgba(255, 255, 255, 0.06)'
          color='white'
          borderRadius='30px'
          minH='250px'
        >
          <VStack spacing={4} align='flex-start'>
            <Text fontSize='24px' fontWeight='bold'>
              Advanced Querying
            </Text>
            <Text fontSize='16px'>
              Leverage advanced filters to identify EVM wallets that align with
              your campaign goals.
            </Text>
          </VStack>
        </Box>
        <Box
          maxW='xs'
          overflow='hidden'
          p={6}
          m={4}
          bg='gray.700'
          background='rgba(255, 255, 255, 0.06)'
          color='white'
          borderRadius='30px'
          minH='250px'
        >
          <VStack spacing={4} align='flex-start'>
            <Text fontSize='24px' fontWeight='bold'>
              Streamlined Airdropping
            </Text>
            <Text fontSize='16px'>
              Seamless NFT Distribution: Automate your airdrop process with our
              intuitive platform, ensuring precision and efficiency.
            </Text>
          </VStack>
        </Box>
        <Box
          maxW='xs'
          overflow='hidden'
          p={6}
          m={4}
          bg='gray.700'
          background='rgba(255, 255, 255, 0.06)'
          color='white'
          borderRadius='30px'
          minH='250px'
        >
          <VStack spacing={4} align='flex-start'>
            <Text fontSize='24px' fontWeight='bold'>
              Impactful Marketing Tool
            </Text>
            <Text fontSize='16px'>
              Maximize Engagement: Employ a strategic approach to enhance your
              project&apos;s visibility and appeal to a targeted web3 community.
            </Text>
          </VStack>
        </Box>
      </HStack>
      {/* <chakra.p
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
      </chakra.p> */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <OrgDetailsModal />
      </Box>
      {/* <Heading
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
        {'Organizations that have already registered with us :) !'}
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
      </Flex> */}
    </Stack>
  )
}
